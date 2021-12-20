import { Returnment } from './../hooks.types';
import { parse, ParsedQs, stringify } from "qs";
import { QueryFieldParams } from "../hooks.types";
import { useLocation, useNavigate } from 'react-router-dom';

export const useQueryField = ({ defaultValues, key, prefix, settingName }: QueryFieldParams): Returnment => {
  const navigate = useNavigate();

  // Тут будет useLocation
  const { search, pathname } = useLocation()
  const parsed = parse(search.slice(1));

  if (!parsed[settingName]) {
    parsed[settingName] = {
      [prefix]: defaultValues
    }
  }

  // Достаём тип настройки, как table, charts etc
  // ParsedQs явно показывает, что мы достали объект, а не строку или массив
  const setting = parsed[settingName] as ParsedQs

  // Пытаемся достать настройки по префиксу, как table.users etc
  const prop = setting[prefix] as any;

  const setter = (value: any) => {
    prop[key] = value;
  
    // Тут должен случиться редирект`
    return navigate(`${pathname}?${stringify(parsed)}`);
  }

  return [prop[key], setter]
}