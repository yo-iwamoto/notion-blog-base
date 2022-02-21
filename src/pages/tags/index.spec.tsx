import { render } from '@/__tests__/util';
import Page, { getStaticProps } from './index.page';

describe('[page] /tags', () => {
  it('renders /tags unchanged', async () => {
    const { container } = render(<Page tags={['React', 'Testing', 'Library']} />);

    expect(container).toMatchSnapshot();
  });

  it('getStaticProps works', async () => {
    const {
      props: { tags },
    } = await getStaticProps();

    expect(tags).toBeTruthy();
  });
});
