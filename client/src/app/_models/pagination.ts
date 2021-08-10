export interface Pagination {
    currentPage: number;
    itemsPerPAge: number;
    totalItems: number;
    totalPages: number;
}

export class PaginationResult<T> {
    result: T;
    pagination: Pagination;
    
}