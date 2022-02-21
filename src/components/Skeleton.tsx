import { VFC } from 'react';

type Props = {
  className?: JSX.IntrinsicElements['div']['className'];
};

export const Skeleton: VFC<Props> = ({ className }) => {
  return <div className={`animate-pulse rounded-sm bg-slate-200 ${className}`} />;
};
