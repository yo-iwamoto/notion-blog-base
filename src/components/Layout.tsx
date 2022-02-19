import type { ReactNode, VFC } from 'react';

type Props = {
  children: ReactNode;
};

export const Layout: VFC<Props> = ({ children }) => {
  return (
    <div className='font-sans text-gray-900'>
      <div className='mx-4 mt-12'>
        <div className='mx-auto w-full max-w-2xl'>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};
