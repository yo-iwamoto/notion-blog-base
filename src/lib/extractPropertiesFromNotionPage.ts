import type { GetPageResponse } from '@notionhq/client/build/src/api-endpoints';
import { dayjs } from '@/lib/dayjs';

/**
 * @description cause side-effect: raise error when the properties are invlid
 */
export const extractPropertiesFromNotionPage = (page: GetPageResponse) => {
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

  return {
    title: title.title[0].plain_text,
    slug: slug.rich_text[0].plain_text,
    status: status.select.name,
    created_at: dayjs(created_at.created_time),
    thumbnail: thumbnail.files[0]?.type === 'file' && thumbnail.files[0].file,
    tags: tags.multi_select,
  };
};
