import { Returnment } from '../hooks.types';
import { stringify, parse } from "qs";
import { useNavigate, data } from "../hooks.mock";
import { FlatQueryParamArgs } from "../hooks.types";

export const useQueryFlatParam = ({ key, defaultValue }: FlatQueryParamArgs): Returnment => {
  const navigate = useNavigate();

  // useLocation mock
  const search = stringify(data);
  const parsed = parse(search);
  
  const prop = parsed[key] as string

  const setter = (value: any) => {
    // Устанавливаем по ключу нужное значение, приводя его к строке
    parsed[key] = value;

    // Типа редирект
    // return navigate(stringify(parsed));
    return console.log(parsed)
  }

  const result = prop ? prop : defaultValue

  return [result, setter]
};