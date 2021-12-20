import { ReturnmentMulti } from './../hooks.types';
import { stringify, parse } from "qs";
import { useNavigate, data } from "../hooks.mock";

export const useQueryFlatParams = <D>(defaultValues: D): ReturnmentMulti<D> => {
  const navigate = useNavigate();

  // useLocation mock
  const search = stringify(data);
  const parsed = parse(search);

  // Подготавливаем объект со всеми свойствами
  

  // Сеттер, D - интерфейс с настройками, которые лежат в строке
  const setter = (payload: Partial<D>) => {
    const result = {
      ...parsed,
      ...payload
    };

    // Типа редирект
    // return navigate(stringify(result));
    return console.log(result)
  }

  const result = { ...defaultValues }
 
  // "Складываем" между собой параметры из search и параметры по умолчанию
  Object.keys(parsed).forEach(key => {
    const item = parsed[key]

    if (typeof item !== 'object') result[key] = item
  })


  return [result, setter]
};
