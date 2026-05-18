import { Client } from '@notionhq/client';
import { getEnv } from '@/lib/schemas/env';

export const notion = new Client({
  auth: getEnv().NOTION_TOKEN,
});
