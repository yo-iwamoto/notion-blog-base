import type { GetStaticPaths, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { notion, databaseBaseQuery } from '@/lib/notion';
import { statusFilter, tagsFilter } from '@/lib/propertyFilters';
import type { FallbackableStaticProps } from '@/types/pageProps';
import { extractPropertiesFromNotionPage } from '@/lib/extractPropertiesFromNotionPage';
import { Skeleton } from '@/components/Skeleton';
import { randomKey } from '@/lib/randomKey';
import { Title } from '@/components/Title';

type PathParams = {
  name: string;
};

export const getStaticPaths: GetStaticPaths<{ name: string }> = async () => {
  const baseQuery = databaseBaseQuery;

  const { properties } = await notion.databases.retrieve(baseQuery);
  if (properties.tags.type !== 'multi_select') {
    throw new Error('invalid database schema');
  }

  const nullablePaths = await Promise.all(
    properties.tags.multi_select.options.map(async (opt) => {
      // drop the tag which is not used for any entry
      // 後から最適化必須
      const query = { ...databaseBaseQuery, filter: { and: [statusFilter('public'), tagsFilter(opt.name)] } };

      const res = await notion.databases.query(query);
      if (res.results.length === 0) {
        return null;
      }
      return {
        params: {
          name: opt.name,
        },
      };
    })
  );
  const paths = nullablePaths.filter((path) => path !== null);

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { name } }: GetStaticPropsContext<PathParams>) => {
  const baseQuery = { ...databaseBaseQuery, filter: { and: [statusFilter('public'), tagsFilter(name)] } };

  let queryResponse = await notion.databases.query(baseQuery);
  const pages = queryResponse.results;

  if (pages.length === 0) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };
  }

  while (queryResponse.has_more) {
    // reason: Promise.all can't be used here because has_more and next_cursor in the response are refered each time
    // eslint-disable-next-line no-await-in-loop
    queryResponse = await notion.databases.query({ ...baseQuery, start_cursor: queryResponse.next_cursor });
    pages.push(...queryResponse.results);
  }

  return {
    props: {
      name,
      pages,
    },
  };
};

export default function ({ name, pages }: FallbackableStaticProps<typeof getStaticProps>) {
  return (
    <>
      <Title>{pages ? <span className='before:content-["#"]'>{name}</span> : <Skeleton className='h-10' />}</Title>
      {pages ? (
        <ul>
          {pages.map((page) => {
            const properties = extractPropertiesFromNotionPage(page);

            return (
              <li key={page.id}>
                <Link href={`/posts/${properties.slug}`}>{properties.title}</Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className='flex flex-col gap-4'>
          {[...Array(5)]
            .map((i) => i)
            .map(() => (
              <Skeleton key={randomKey()} className='h-6 w-full' />
            ))}
        </div>
      )}
    </>
  );
}
