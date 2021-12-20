import { KeyValueObj, Returnment } from './../hooks.types';
import { parse, ParsedQs, stringify } from "qs";
import { data, useNavigate } from "../hooks.mock";
import { QueryFieldParams } from "../hooks.types";

export const useQueryField = ({ defaultValues, key, prefix, settingName }: QueryFieldParams): Returnment => {
  const navigate = useNavigate();

  // Тут будет useLocation
  const search = stringify(data);
  const parsed = parse(search);

  // Достаём тип настройки, как table, charts etc
  // ParsedQs явно показывает, что мы достали объект, а не строку или массив
  const setting = parsed[settingName] as ParsedQs;
  // Пытаемся достать настройки по префиксу, как table.users etc
  const prop = setting[prefix] as KeyValueObj;

  const setter = (value: any) => {
    if (prop) {
      // Если параметры уже существуют, то переписываем 1 единственный параметр по ключу из аргумента
      prop[key] = value;
    } else {
      /*
      Если параметров ещё не записано, то мы устанавливаем параметры по умолчанию, после чего по ключу 
      устанавливаем нужное нам значение value
      */
      setting[prefix] = {
        ...defaultValues,
        [key]: value
      };
    }

    // Тут должен случиться редирект
    // return navigate(stringify(parsed));
    return console.log(parsed);
  }

  const _value = prop ? prop[key] : defaultValues[key]

  return [_value, setter]
}