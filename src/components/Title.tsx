import { ReactNode, VFC } from 'react';

type Props = {
  children: ReactNode;
};

export const Title: VFC<Props> = ({ children }) => {
  return <h1 className='mb-12 text-4xl font-bold'>{children}</h1>;
};
