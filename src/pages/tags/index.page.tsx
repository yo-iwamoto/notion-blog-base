import Link from 'next/link';
import { databaseBaseQuery, notion } from '@/lib/notion';
import { FallbackableStaticProps } from '@/types/pageProps';
import { Title } from '@/components/Title';
import { statusFilter, tagsFilter } from '@/lib/propertyFilters';

export const getStaticProps = async () => {
  const baseQuery = databaseBaseQuery;

  const { properties } = await notion.databases.retrieve(baseQuery);
  if (properties.tags.type !== 'multi_select') {
    throw new Error('invalid database schema');
  }

  const nullableTags = await Promise.all(
    properties.tags.multi_select.options.map(async (opt) => {
      // drop the tag which is not used for any entry
      // 後から最適化必須
      const query = { ...databaseBaseQuery, filter: { and: [statusFilter('public'), tagsFilter(opt.name)] } };

      const res = await notion.databases.query(query);
      if (res.results.length === 0) {
        return null;
      }
      return opt.name;
    })
  );
  const tags = nullableTags.filter((tag) => tag !== null);

  return {
    props: {
      tags,
    },
  };
};

export default function ({ tags }: FallbackableStaticProps<typeof getStaticProps>) {
  return (
    <>
      <Title>Tags</Title>
      <ul>
        {tags.map((tag) => (
          <li key={tag} className='my-4'>
            <Link href={`/tags/${tag}`}>
              <span
                className='cursor-pointer text-2xl font-bold
                italic before:content-["#"] hover:text-gray-600'
              >
                {tag}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
