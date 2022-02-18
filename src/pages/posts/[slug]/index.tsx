import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { notion, databaseBaseQuery } from '@/lib/notion';
import { slugFilter, statusFilter } from '@/lib/propertyFilters';

type PathParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const baseQuery = { ...databaseBaseQuery, filter: statusFilter('public') };

  let queryResponse = await notion.databases.query(baseQuery);
  const pages = queryResponse.results;

  // fetch all data by paging
  while (queryResponse.has_more) {
    // reason: Promise.all can't be used here because has_more and next_cursor in the response are refered each time
    // eslint-disable-next-line no-await-in-loop
    queryResponse = await notion.databases.query({ ...baseQuery, start_cursor: queryResponse.next_cursor });
    pages.push(...queryResponse.results);
  }

  const paths = pages
    .map((page) => {
      // if the type is invalid, temporaly return null
      if (!('properties' in page) || page.properties.slug.type !== 'rich_text') {
        return null;
      }

      return {
        params: {
          slug: page.properties.slug.rich_text[0].plain_text,
        },
      };
    })
    // drop null entry
    .filter((page) => page !== null);

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }: GetStaticPropsContext<PathParams>) => {
  const queryResponse = await notion.databases.query({
    ...databaseBaseQuery,
    filter: {
      // matches with slug, and status is public
      and: [slugFilter(slug), statusFilter('public')],
    },
  });
  if (queryResponse.results.length !== 1) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };
  }

  const block_id = queryResponse.results[0].id;

  const baseQuery = { block_id };

  let listResponse = await notion.blocks.children.list(baseQuery);
  const blocks = listResponse.results;

  // fetch all data by paging
  while (listResponse.has_more) {
    // reason: Promise.all can't be used here because has_more and next_cursor in the response are refered each time
    // eslint-disable-next-line no-await-in-loop
    listResponse = await notion.blocks.children.list({ ...baseQuery, start_cursor: listResponse.next_cursor });
    blocks.push(...listResponse.results);
  }

  return {
    props: {
      blocks,
    },
  };
};

export default function (props: InferGetStaticPropsType<typeof getStaticProps>) {
  return <h1>Hello</h1>;
}
