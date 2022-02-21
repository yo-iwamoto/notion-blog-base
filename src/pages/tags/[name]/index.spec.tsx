import { random } from '@/lib/random';
import { render } from '@/__tests__/util';
import Page, { getStaticPaths, getStaticProps } from './index.page';

describe('[page] /tags/[name]', () => {
  it('renders /tags/[name] unchanged', async () => {
    const { container } = render(
      <Page
        name='tag name'
        pages={[
          {
            id: 'id',
            properties: {
              title: 'title',
              slug: 'slug',
              created_at: '2020-03-17T21:49:37.913Z',
              tags: [{ id: 'id', color: 'blue', name: 'React' }],
              status: 'public',
            },
          },
        ]}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('getStaticPaths works', async () => {
    const { paths } = await getStaticPaths({});

    expect(paths).toBeTruthy();
  });

  it('getStaticProps works', async () => {
    const { paths } = await getStaticPaths({});

    const path = paths[0];

    if (typeof path === 'string') {
      return;
    }

    const { props } = await getStaticProps({ ...path });

    expect(props.pages && props.name).toBeTruthy();
  });

  it('fallback works', async () => {
    const randomName = random().toString();

    const gspReturn = await getStaticProps({ params: { name: randomName } });

    expect(gspReturn).toEqual({
      redirect: {
        permanent: false,
        destination: '/404',
      },
    });
  });
});
