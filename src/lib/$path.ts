export const pagesPath = {
  $404: {
    $url: (url?: { hash?: string }) => ({ pathname: '/404' as const, hash: url?.hash }),
  },
  posts: {
    _slug: (slug: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/posts/[slug]' as const, query: { slug }, hash: url?.hash }),
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/posts' as const, hash: url?.hash }),
  },
  tags: {
    _name: (name: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/tags/[name]' as const, query: { name }, hash: url?.hash }),
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/tags' as const, hash: url?.hash }),
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash }),
};

export type PagesPath = typeof pagesPath;
