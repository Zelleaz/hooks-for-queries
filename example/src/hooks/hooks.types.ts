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
  parced: string
}

export interface ChartParams {
  parseTree: boolean
  animate: boolean
  caching: boolean
  name: string 
  rating: number
}

export type PartialStringer<T> = {
  [P in keyof T]?: string
}

export type Stringer<T> = {
  [P in keyof T]: string
}

export type ReturnmentMulti<D> = [PartialStringer<D>, (data: PartialStringer<D>) => void]

export type Returnment<T> = [string, (value: T) => void]
