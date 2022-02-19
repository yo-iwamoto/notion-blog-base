import type { ReactNode, VFC } from 'react';

type Props = {
  children: ReactNode;
};

export const Layout: VFC<Props> = ({ children }) => {
  return <div className='font-sans'>{children}</div>;
};
