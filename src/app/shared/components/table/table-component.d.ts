export enum TableComponentCommonHeader {
  actions = 'ACTIONS',
  index = 'INDEX',
}

export type TableComponentHeaderObject<T> = {
  [K in keyof typeof TableComponentCommonHeader]: T;
};

export type TableComponentColumnSortOptions = {
  active: boolean;
  direction: 'asc' | 'desc';
};

export type TableComponentTypeColumn<T> = {
  selector: keyof T;
  header?: string;
  width?: string;
  sort?: TableComponentColumnSortOptions;
};

export type TableComponentCommonColumn<T> = {
  header?: string | TableComponentCommonHeader;
  options?: T;
  sort?: TableComponentColumnSortOptions;
};

export type TableComponentColumn = {
  selector: string;
  width?: string;
  sort?: TableComponentColumnSortOptions;
};

export type TableComponentActionHeaderOptions = {
  edit?: boolean;
  delete?: boolean;
  inspect?: boolean;
};

export type TableComponentCommonColumns = Omit<
  TableComponentHeaderObject<TableComponentCommonColumn<any>>,
  'actions' | 'index'
> & {
  actions?: TableComponentCommonColumn<TableComponentActionHeaderOptions>;
};
