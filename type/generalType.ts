export interface I_Filter {
  search: string;
  limit: number;
  page: number;
}

export interface I_Pagination {
  totalCount: number;
  totalPage: number;
}

export interface I_PageConstruct {
  title: string;
  description: string;
  metaData: any[];
}
