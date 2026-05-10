import { NextRequest } from 'next/server';
import { notion } from '@/lib/clients/notion';
import { redis } from '@/lib/clients/redis';
import { SubmissionSchema, type Submission } from '@/features/submission/schemas/submission';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function writeToNotion(data: Submission): Promise<void> {
  await notion.pages.create({
    parent: { database_id: process.env.NOTION_DATABASE_ID! },
    properties: {
      'Session ID': { rich_text: [{ text: { content: data.sessionId } }] },
      'Business ID': { rich_text: [{ text: { content: data.businessId } }] },
      'Business Name': { rich_text: [{ text: { content: data.businessName } }] },
      'Q1 Answer': { rich_text: [{ text: { content: data.q1Answer } }] },
      'Q2 Answer': { rich_text: [{ text: { content: data.q2Answer } }] },
      'Star Rating': { number: data.starRating },
      'Completion Time': { number: data.completionTime },
      Timestamp: { date: { start: new Date().toISOString() } },
      'Final Submitted Text': {
        rich_text: data.finalSubmittedText ? [{ text: { content: data.finalSubmittedText } }] : [],
      },
      ...(data.edited !== null && {
        Edited: { checkbox: data.edited },
      }),
      ...(data.googleRedirectTaken !== null && {
        'Google Redirect Taken': { checkbox: data.googleRedirectTaken },
      }),
    },
  });
}

export async function POST(request: NextRequest): Promise<Response> {
  // Step 1 — Validate
  const body = SubmissionSchema.safeParse(await request.json());
  if (!body.success) {
    return Response.json({ error: body.error.flatten() }, { status: 400 });
  }

  // Step 2 — Rate limit
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const count = await redis.incr(`ratelimit:${ip}`);
  if (count === 1) await redis.expire(`ratelimit:${ip}`, 3600);
  if (count > 3) {
    return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  // Step 3 — Deduplication
  const isDuplicate = await redis.get(`dedup:${body.data.sessionId}`);
  if (isDuplicate) {
    return Response.json({}, { status: 200 });
  }

  // Step 4 — Notion write with one retry
  try {
    await writeToNotion(body.data);
  } catch {
    await wait(500);
    try {
      await writeToNotion(body.data);
    } catch (error) {
      console.error({
        event: 'notion_write_failed',
        sessionId: body.data.sessionId,
        businessId: body.data.businessId,
        timestamp: new Date().toISOString(),
        error: String(error),
      });
      return Response.json({}, { status: 200 });
    }
  }

  // Step 5 — Mark session as submitted
  await redis.set(`dedup:${body.data.sessionId}`, '1', { ex: 86400 });

  return Response.json({}, { status: 200 });
}
