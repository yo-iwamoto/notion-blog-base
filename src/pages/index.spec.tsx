import { render } from '@/__tests__/util';
import Page from './index.page';

describe('[page] /', () => {
  it('renders / unchanged', async () => {
    const { container } = render(
      <Page
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
});
