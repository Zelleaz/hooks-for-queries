export interface BaseQueryParams {
  settingName: string;
  prefix: string;
  defaultValues: any;
}

export interface QueryFieldParams extends BaseQueryParams {
  key: string;
}

export interface FlatQueryParamArgs {
  key: string;
  defaultValue: string
}

export interface KeyValueObj {
  [key: string]: string;
}

export interface TableSetting {
  page: number 
  rowsPerPage: number
  order: 'asc' | 'desc',
  orderBy: string
}

export interface FlatParams {
  fontSize: string
  language: string 
}

export type ReturnmentMulti<D> = [D, (data: Partial<D>) => void]

export type Returnment = [string, (value: any) => void]