import { ReturnmentMulti, PartialStringer } from './../hooks.types';
import { stringify, parse } from "qs";
import { useNavigate, useLocation } from 'react-router-dom';

export const useQueryFlatParams = <D>(defaultValues: any): ReturnmentMulti<D> => {
  const navigate = useNavigate();

  // useLocation mock
  const { search, pathname } = useLocation()
  const parsed = parse(search.slice(1));

  // Подготавливаем объект со всеми свойствами
  

  // Сеттер, D - интерфейс с настройками, которые лежат в строке
  const setter = (payload: PartialStringer<D>) => {
    const result = {
      ...parsed,
      ...payload
    };
   
    // Типа редирект
    // return navigate(stringify(result));
    return navigate(`${pathname}?${stringify(result)}`)
  }

  const result = { ...defaultValues }

  // "Складываем" между собой параметры из search и параметры по умолчанию
  Object.keys(parsed).forEach(key => {
    const item = parsed[key]

    if (typeof item !== 'object') result[key] = item
  })


  return [result, setter]
};
