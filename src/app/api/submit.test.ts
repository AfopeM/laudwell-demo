import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock both clients before any imports that use them
vi.mock('@/lib/clients/notion', () => ({
  notion: {
    pages: {
      create: vi.fn(),
    },
  },
}));

vi.mock('@/lib/clients/redis', () => ({
  redis: {
    incr: vi.fn(),
    expire: vi.fn(),
    get: vi.fn(),
    set: vi.fn(),
  },
}));

import { POST } from '@/app/api/submit/route';
import { notion } from '@/lib/clients/notion';
import { redis } from '@/lib/clients/redis';

// Cast to typed mocks so Vitest knows these are mock functions
const notionCreate = vi.mocked(notion.pages.create);
const redisIncr = vi.mocked(redis.incr);
const redisExpire = vi.mocked(redis.expire);
const redisGet = vi.mocked(redis.get);
const redisSet = vi.mocked(redis.set);

const validHighRaterPayload = {
  businessId: 'test-business',
  businessName: 'Test Business',
  sessionId: '550e8400-e29b-41d4-a716-446655440000',
  q1Answer: 'The staff made me feel genuinely cared for',
  q2Answer: 'Professional and thorough',
  starRating: 5,
  edited: false,
  googleRedirectTaken: true,
  completionTime: 45,
  finalSubmittedText: 'Great experience overall.',
};

const validLowRaterPayload = {
  ...validHighRaterPayload,
  starRating: 2,
  edited: null,
  googleRedirectTaken: null,
  finalSubmittedText: null,
};

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': '1.2.3.4',
    },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  // Default happy-path state for all Redis calls
  redisIncr.mockResolvedValue(1);
  redisExpire.mockResolvedValue(1);
  redisGet.mockResolvedValue(null);
  redisSet.mockResolvedValue('OK');
  notionCreate.mockResolvedValue({} as never);
});

describe('POST /api/submit', () => {
  it('valid high-rater payload writes to Notion and sets dedup key', async () => {
    const res = await POST(makeRequest(validHighRaterPayload) as never);
    expect(res.status).toBe(200);
    expect(notionCreate).toHaveBeenCalledTimes(1);
    expect(redisSet).toHaveBeenCalledWith(`dedup:${validHighRaterPayload.sessionId}`, '1', {
      ex: 86400,
    });
  });

  it('valid low-rater payload writes to Notion', async () => {
    const res = await POST(makeRequest(validLowRaterPayload) as never);
    expect(res.status).toBe(200);
    expect(notionCreate).toHaveBeenCalledTimes(1);
  });

  it('missing required field returns 400 and does not call Notion', async () => {
    const payload = { ...validHighRaterPayload, businessId: undefined };
    const res = await POST(makeRequest(payload) as never);
    expect(res.status).toBe(400);
    expect(notionCreate).not.toHaveBeenCalled();
  });

  it('wrong type on starRating returns 400 and does not call Notion', async () => {
    const res = await POST(makeRequest({ ...validHighRaterPayload, starRating: 'five' }) as never);
    expect(res.status).toBe(400);
    expect(notionCreate).not.toHaveBeenCalled();
  });

  it('duplicate session ID returns 200 and does not call Notion', async () => {
    redisGet.mockResolvedValue('1');
    const res = await POST(makeRequest(validHighRaterPayload) as never);
    expect(res.status).toBe(200);
    expect(notionCreate).not.toHaveBeenCalled();
    expect(redisSet).not.toHaveBeenCalled();
  });

  it('IP exceeding rate limit returns 429 and does not call Notion', async () => {
    redisIncr.mockResolvedValue(4);
    const res = await POST(makeRequest(validHighRaterPayload) as never);
    expect(res.status).toBe(429);
    expect(notionCreate).not.toHaveBeenCalled();
  });

  it('Notion failure on first attempt retries and succeeds on second', async () => {
    notionCreate.mockRejectedValueOnce(new Error('timeout')).mockResolvedValueOnce({} as never);
    const res = await POST(makeRequest(validHighRaterPayload) as never);
    expect(res.status).toBe(200);
    expect(notionCreate).toHaveBeenCalledTimes(2);
    expect(redisSet).toHaveBeenCalledWith(`dedup:${validHighRaterPayload.sessionId}`, '1', {
      ex: 86400,
    });
  });

  it('Notion failure on both attempts logs error and does not set dedup key', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    notionCreate.mockRejectedValue(new Error('permanent failure'));
    const res = await POST(makeRequest(validHighRaterPayload) as never);
    expect(res.status).toBe(200);
    expect(notionCreate).toHaveBeenCalledTimes(2);
    expect(redisSet).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.objectContaining({ event: 'notion_write_failed' }),
    );
    consoleSpy.mockRestore();
  });
});
