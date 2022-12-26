const objectToFormData = (obj: object): FormData => {
  const data = new FormData();

  for (const [key, value] of Object.entries(obj)) {
    data.append(key, value);
  }

  return data;
};

export { objectToFormData };
