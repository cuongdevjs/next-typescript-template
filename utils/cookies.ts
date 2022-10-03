import { objectType } from '@type/customType';
import { deleteCookie, getCookie, getCookies, setCookies } from 'cookies-next';

export const onGetAllCookies = (options: objectType = {}) =>
  getCookies(options);

export const onGetCookie = (key: string) => getCookie(key);

export const onSetCookie = (
  key: string,
  value: string,
  options: objectType = {},
) => {
  setCookies(key, value, options);
};

export const onDeleteCookie = (key: string, options: objectType = {}) => {
  deleteCookie(key, options);
};
