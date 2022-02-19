import type { GetStaticPaths, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { NotionBlock } from '@/components/NotionBlock';
import { extractPropertiesFromNotionPage } from '@/lib/extractPropertiesFromNotionPage';
import { databaseBaseQuery, notion } from '@/lib/notion';
import { slugFilter, statusFilter } from '@/lib/propertyFilters';
import type { FallbackableStaticProps } from '@/types/pageProps';

type PathParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const baseQuery = { ...databaseBaseQuery, filter: statusFilter('public') };

  let queryResponse = await notion.databases.query(baseQuery);
  const pages = queryResponse.results;

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

  const block = queryResponse.results[0];

  const { title, created_at, tags } = extractPropertiesFromNotionPage(block, 'json');

  const baseQuery = { block_id: block.id };

  let listResponse = await notion.blocks.children.list(baseQuery);
  const blocks = listResponse.results;

  while (listResponse.has_more) {
    // reason: Promise.all can't be used here because has_more and next_cursor in the response are refered each time
    // eslint-disable-next-line no-await-in-loop
    listResponse = await notion.blocks.children.list({ ...baseQuery, start_cursor: listResponse.next_cursor });
    blocks.push(...listResponse.results);
  }

  return {
    props: {
      title,
      created_at,
      tags,
      blocks,
    },
  };
};

export default function ({ title, created_at, tags, blocks }: FallbackableStaticProps<typeof getStaticProps>) {
  return (
    <>
      <h1 className='text-3xl font-bold'>{title}</h1>
      <div className='h-4' />
      <div className='flex gap-2'>
        {tags.map((tag) => (
          <Link key={tag.name} href={`/tags/${tag.name}`}>
            <span className='cursor-pointer before:content-["#"] hover:text-gray-500'>{tag.name}</span>
          </Link>
        ))}
      </div>
      <div className='h-2' />
      <p>{created_at}</p>
      <div className='h-10' />
      {blocks.map((block) => (
        <NotionBlock key={block.id} {...block} />
      ))}
    </>
  );
}
