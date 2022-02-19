import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactNode } from 'react';
import { Layout } from '@/components/Layout';

const wrapper = ({ children }: { children: ReactNode }) => {
  return <Layout>{children}</Layout>;
};

const customeRender = (ui: JSX.Element, options?: RenderOptions) => render(ui, { wrapper, ...options });

export { customeRender as render };
