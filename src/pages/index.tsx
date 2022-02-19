import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { extractPropertiesFromNotionPage } from '@/lib/extractPropertiesFromNotionPage';
import { databaseBaseQuery, notion } from '@/lib/notion';
import { statusFilter } from '@/lib/propertyFilters';
import { Title } from '@/components/Title';
import { Skeleton } from '@/components/Skeleton';
import { randomKey } from '@/lib/randomKey';

export const getStaticProps = async () => {
  const baseQuery = { ...databaseBaseQuery, filter: statusFilter('public') };

  let queryResponse = await notion.databases.query(baseQuery);
  const pages = queryResponse.results;

  while (queryResponse.has_more) {
    // reason: Promise.all can't be used here because has_more and next_cursor in the response are refered each time
    // eslint-disable-next-line no-await-in-loop
    queryResponse = await notion.databases.query({
      ...baseQuery,
      start_cursor: queryResponse.next_cursor,
    });
    pages.push(...queryResponse.results);
  }

  return {
    props: {
      pages,
    },
  };
};

export default function ({ pages }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Title>Blogs</Title>

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
    </>
  );
}
