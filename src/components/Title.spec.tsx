// reason: jest is run on development
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen } from '@testing-library/react';
import { Title } from '@/components/Title';

describe('[Component] Title', () => {
  it('should be rendered', () => {
    render(<Title>Hello</Title>);

    const rendered = screen.getByText('Hello');

    expect(rendered).toBeInTheDocument();
  });
});
