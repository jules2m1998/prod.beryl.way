export const formatPhone = (value: string): string => {
  const groups: string[] = [];

  for (let i = 0; i < value.length; i += 2) {
    groups.push(value.substring(i, i + 2));
  }

  return "";
};
