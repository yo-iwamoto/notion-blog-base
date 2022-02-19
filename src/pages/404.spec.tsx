import { render } from '@/__tests__/util';
import Page from './404.page';

describe('[page] /404', () => {
  it('renders /404 unchanged', async () => {
    const { container } = render(<Page />);

    expect(container).toMatchSnapshot();
  });
});
