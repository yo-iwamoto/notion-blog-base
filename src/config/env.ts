export const PUBLIC_ENV = {
  notionDbId: process.env.NEXT_PUBLIC_NOTION_DB_ID as string,
};

const isServerSide = typeof window === 'undefined';

export const PRIVATE_ENV = isServerSide
  ? {
      notionIntegrationToken: process.env.NOTION_INTEGRATION_TOKEN as string,
    }
  : null;
