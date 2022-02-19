import type { GetStaticPaths, GetStaticPropsContext } from 'next';
import { databaseBaseQuery, notion } from '@/lib/notion';
import { statusFilter, tagsFilter } from '@/lib/propertyFilters';
import type { FallbackableStaticProps } from '@/types/pageProps';

type PathParams = {
  name: string;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const baseQuery = databaseBaseQuery;

  const { properties } = await notion.databases.retrieve(baseQuery);
  if (properties.tags.type !== 'multi_select') {
    throw new Error('invalid database schema');
  }

  const paths = properties.tags.multi_select.options.map((opt) => ({
    params: {
      name: opt.name,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { name } }: GetStaticPropsContext<PathParams>) => {
  const baseQuery = { ...databaseBaseQuery, filter: { and: [statusFilter('public'), tagsFilter(name)] } };

  let queryResponse = await notion.databases.query(baseQuery);
  const pages = queryResponse.results;

  while (queryResponse.has_more) {
    // reason: Promise.all can't be used here because has_more and next_cursor in the response are refered each time
    // eslint-disable-next-line no-await-in-loop
    queryResponse = await notion.databases.query({ ...baseQuery, start_cursor: queryResponse.next_cursor });
    pages.push(...queryResponse.results);
  }

  return {
    props: {
      pages,
    },
  };
};

export default function (props: FallbackableStaticProps<typeof getStaticProps>) {
  // return <h1 />;
}
