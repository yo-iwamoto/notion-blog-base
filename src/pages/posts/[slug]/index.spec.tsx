import { render } from '@/__tests__/util';
import Page from './index.page';

describe('[page] /tags', () => {
  it('renders /tags unchanged', async () => {
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
