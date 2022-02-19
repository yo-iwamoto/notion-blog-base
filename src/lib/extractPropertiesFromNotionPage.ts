import type { GetPageResponse } from '@notionhq/client/build/src/api-endpoints';
import { dayjs } from '@/lib/dayjs';

/**
 * @description cause side-effect: raise error when the properties are invlid
 */
export const extractPropertiesFromNotionPage = (page: GetPageResponse, format: 'object' | 'json' = 'object') => {
  const error = new Error('notion-page-type-assertion-failed');

  if (!('properties' in page)) {
    throw error;
  }

  // distruct props, these may be undefined
  const {
    properties: { title, slug, status, created_at, thumbnail, tags },
  } = page;

  if (
    title === undefined ||
    title.type !== 'title' ||
    slug === undefined ||
    slug.type !== 'rich_text' ||
    status === undefined ||
    status.type !== 'select' ||
    created_at === undefined ||
    created_at.type !== 'created_time' ||
    thumbnail === undefined ||
    thumbnail.type !== 'files' ||
    tags === undefined ||
    tags.type !== 'multi_select'
  ) {
    throw error;
  }

  const result = {
    title: title.title.map((text) => text.plain_text),
    slug: slug.rich_text.map((text) => text.plain_text),
    status: status.select.name,
    created_at: dayjs(created_at.created_time),
    thumbnail_url: thumbnail.files[0]?.type === 'file' && thumbnail.files[0].file.url,
    tags: tags.multi_select,
  };

  if (format === 'object') {
    return result;
  }

  return {
    ...result,
    created_at: result.created_at.format('YYYY/MM/DD'),
  };
};
