export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginationResult {
  page: number;
  limit: number;
  skip: number;
}

export default class Pagination {
  static getPagination(
    options: PaginationOptions
  ): PaginationResult {
    const page = Math.max(
      Number(options.page) || 1,
      1
    );

    const limit = Math.min(
      Math.max(Number(options.limit) || 10, 1),
      100
    );

    return {
      page,
      limit,
      skip: (page - 1) * limit,
    };
  }

  static getMeta(
    total: number,
    page: number,
    limit: number
  ) {
    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrevious: page > 1,
    };
  }
}