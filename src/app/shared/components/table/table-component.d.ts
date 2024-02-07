export enum TableComponentCommonHeader {
  actions = 'ACTIONS',
  index = 'INDEX',
}

export type TableComponentHeaderObject<T> = {
  [K in keyof typeof TableComponentCommonHeader]: T;
};

export type TableComponentTypeColumn<T> = {
  selector: keyof T;
  header?: string;
};

export type TableComponentCommonColumn<T> = {
  header?: string | TableComponentCommonHeader;
  options?: T;
};

export type TableComponentActionHeaderOptions = {
  edit?: boolean;
  delete?: boolean;
};

export type TableComponentCommonColumns = Omit<
  TableComponentHeaderObject<TableComponentCommonColumn<any>>,
  'actions' | 'index'
> & {
  actions?: TableComponentCommonColumn<TableComponentActionHeaderOptions>;
};
