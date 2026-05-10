import { Client } from '@notionhq/client';
import { env } from '@/lib/schemas/env';

export const notion = new Client({
  auth: env.NOTION_TOKEN,
});
