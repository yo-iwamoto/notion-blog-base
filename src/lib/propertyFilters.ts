export const slugFilter = (slug: string) => ({
  property: 'slug',
  rich_text: {
    contains: slug,
  },
});

export const statusFilter = (status: 'public' | 'draft') => ({
  property: 'status',
  select: {
    equals: status,
  },
});

export const tagsFilter = (tag: string) => ({
  property: 'tags',
  multi_select: {
    contains: tag,
  },
});
