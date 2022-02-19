import { InferGetStaticPropsType } from 'next';

type EmptyPageProps = { [key: string]: never };

export type FallbackableStaticProps<T> = EmptyPageProps | InferGetStaticPropsType<T>;
