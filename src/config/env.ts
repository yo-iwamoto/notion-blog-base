export const PUBLIC_ENV = {
  notionDbId: process.env.NEXT_PUBLIC_NOTION_DB_ID as string,
};

const isServerSide = typeof window === 'undefined' || process.env.NODE_ENV === 'test';

export const PRIVATE_ENV = isServerSide
  ? {
      notionIntegrationToken: process.env.NOTION_INTEGRATION_TOKEN as string,
    }
  : null;
