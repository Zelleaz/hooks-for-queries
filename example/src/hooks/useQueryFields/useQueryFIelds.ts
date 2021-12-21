import { stringify, parse, ParsedQs } from 'qs';
import { useNavigate, useLocation } from 'react-router-dom';
import { BaseQueryParams, KeyValueObj, PartialStringer, ReturnmentMulti } from './../hooks.types';

export const useQueryFields = <D>(args: BaseQueryParams): ReturnmentMulti<D> => {
  const { settingName, defaultValues, prefix } = args;

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
  const setting = parsed[settingName] as ParsedQs;
  // Пытаемся достать настройки по префиксу, как table.users etc
  const prop = setting[prefix] as KeyValueObj;

  /* 
  D - интерфейс аргументов для настроек.
  Внутри с помощью типа Partial все поля интерфейса становятся опциональными, 
  чтобы мы могли выбрать какие из свойств установить, а какие не трогать
  */
  const setter = (data: PartialStringer<D>) => {
    if (prop) {
      // Если мы нашли настройки по префиксу, то разворачиваем их и добавляем свои через data
      setting[prefix] = {
        ...prop,
        ...data
      };
    } else {
      // Если настроек нет, то разворачиваем дефолтные параметры, а затем переданные аргументы
      setting[prefix] = {
        ...defaultValues,
        ...data
      };
    }

    // Тут должен быть редирект
    // return navigate(stringify(parsed));
    return navigate(`${pathname}?${stringify(parsed)}`)
  }

  const result = prop ? prop : defaultValues

  return [result, setter]
};