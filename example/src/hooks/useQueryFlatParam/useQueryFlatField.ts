import { Returnment } from '../hooks.types';
import { stringify, parse } from "qs";
import { FlatQueryParamArgs } from "../hooks.types";
import { useNavigate, useLocation } from 'react-router-dom';

export const useQueryFlatParam = <T = string>({ key, defaultValue }: FlatQueryParamArgs): Returnment<T> => {
  const navigate = useNavigate();

  // useLocation mock
  const { search, pathname } = useLocation()
  const parsed = parse(search.slice(1));
  
  const prop = parsed[key] as string

  const setter = (value: T) => {
    // Устанавливаем по ключу нужное значение, приводя его к строке
    parsed[key] = String(value);

    // Типа редирект
    // return navigate(stringify(parsed));
    return navigate(`${pathname}?${stringify(parsed)}`)
  }

  const result = prop ? prop : defaultValue

  return [result, setter]
};