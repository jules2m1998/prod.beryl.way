export type Difference = {
  changed: string[];
  unchanged: string[];
  isDifferent: boolean;
};

const objectToFormData = (obj: object): FormData => {
  const data = new FormData();

  for (const [key, value] of Object.entries(obj)) {
    data.append(key, value);
  }

  return data;
};

export const objectToFormDataAndExclude = (
  obj: object,
  excluded: string[] = []
): FormData => objectToFormData(excludeParamsToObject(obj, excluded));

export const excludeParamsToObject = <T extends object>(
  obj: T,
  excluded: string[] = []
): Partial<T> => {
  excluded.forEach((str) => {
    if (Object.hasOwn(obj, str)) delete obj[str];
  });
  return obj;
};

export const differentsPropValue = <T extends object>(
  toObj: T,
  withObj: T
): Difference => {
  const keys = Object.keys(toObj);
  const changed: string[] = [];
  const unchanged: string[] = [];
  keys.forEach((v) => {
    if (toObj[v] !== withObj[v]) changed.push(v);
    else unchanged.push(v);
  });
  return {
    changed,
    unchanged,
    isDifferent: changed.length > 0,
  };
};

export { objectToFormData };
