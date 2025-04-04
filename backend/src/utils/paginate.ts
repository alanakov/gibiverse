interface PaginateParams {
  model: any;
  page?: number;
  limit?: number;
  where?: any;
  order?: any[];
  include?: any[];
}

export async function paginate({
  model,
  page = 1,
  limit = 10,
  where,
  order = [["id", "ASC"]],
  include = [],
}: PaginateParams) {
  const offset = (page - 1) * limit;

  const { count, rows } = await model.findAndCountAll({
    where,
    order,
    offset,
    limit,
    include,
  });

  return {
    data: rows,
    total: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
}
