import { TableSetting, FlatParams, ChartParams, Stringer } from './hooks.types';
export const data = {
  table: {
    users: {
      page: '0',
      rowsPerPage: '5',
      order: "asc",
      orderBy: ""
    },
    dogs: {
      page: '1',
      rowsPerPage: '10',
      order: "desc",
      orderBy: "name"
    }
  },
  charts: {
    visitors: {
      all: 'true',
      x: 'true',
      y: 'false',
      disabledColumns: ["users"]
    }
  },
  fontSize: 16
};
// Моковые данные для имитации search

// Моковый useNavigate
export const useNavigate = () => (path: string) => {
  console.log(path)
}

export const tableDefaultValues: Stringer<TableSetting> = {
  page: '3',
  rowsPerPage: '15',
  order: 'desc',
  orderBy: ''
}

export const flatDefaultValues: Stringer<FlatParams> = {
  fontSize: '23',
  language: 'en',
  parced: 'any'
}

export const chartDefaultValues: Stringer<ChartParams> = {
  animate: 'true',
  caching: 'true',
  name: 'Lorem',
  parseTree: 'false',
  rating: '0'
}