import { Client } from '@notionhq/client';
import { PRIVATE_ENV, PUBLIC_ENV } from '@/config/env';

export const notion = new Client({ auth: PRIVATE_ENV?.notionIntegrationToken });

export const databaseBaseQuery = { database_id: PUBLIC_ENV.notionDbId };
