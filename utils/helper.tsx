/* eslint-disable no-unused-vars */


/**
 * @param {number} input: number
 * @return number formatted, 100000 => 100,000
 */
export const formatNumber = (number: number): string => {
  const value = `${number}`;
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
};

/**
 * @param func function debounced
 * @param waitFor time debounce
 */
export const debounce = <F extends (...args: any) => any>(
  func: F,
  waitFor: number,
) => {
  const timeout = 0;

  const debounced = (...args: any) => {
    clearTimeout(timeout);
    setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

export const isServer = typeof window === 'undefined';

export const toggleItemArrs = <T extends string | number>(
  arrs: T[],
  item: T,
) => {
  const listXor: T[] = arrs.some(el => el === item)
    ? arrs.filter(el => el !== item)
    : [...arrs, item];
  return listXor;
};

export const convertYoutubeUrlToEmbedUrl = url => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  const videoId = match && match[2].length === 11 ? match[2] : null;

  return `//www.youtube-nocookie.com/embed/${videoId}`;
};
