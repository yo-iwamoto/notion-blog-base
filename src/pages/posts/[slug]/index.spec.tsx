import { render } from '@/__tests__/util';
import Page from './index.page';

describe('[page] /posts/[slug]', () => {
  it('renders /posts/[slug] unchanged', async () => {
    const { container } = render(
      <Page
        title='title'
        tags={[
          {
            id: 'id',
            color: 'blue',
            name: 'React',
          },
        ]}
        blocks={
          [
            // TODO
          ]
        }
        created_at='2022/02/20'
      />
    );

    expect(container).toMatchSnapshot();
  });
});
