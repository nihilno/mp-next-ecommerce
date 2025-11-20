export function CreateProductsCacheKey(params: {
  slug?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}) {
  const { slug, search, sort, page, limit } = params;
  const keyParts = ["products"];

  if (slug) keyParts.push(`category-${slug}`);
  if (search) keyParts.push(`search-${search}`);
  if (sort) keyParts.push(`sort-${sort}`);
  if (page) keyParts.push(`page-${page}`);
  if (limit) keyParts.push(`limit-${limit}`);

  return keyParts.join("-");
}

export function CreateProductsCacheTags(params: {
  slug?: string;
  search?: string;
}) {
  const { slug, search } = params;
  const tags = ["products"];

  if (slug) tags.push(`category-${slug}`);
  if (search) tags.push(`search-${search}`);

  return tags;
}
