export const formatToXaf = (value: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "XAF",
  });
  return formatter.format(value);
};

export const formatPhoneNumber = (value?: string) => {
  if (!value) return value;
  const input = value.replace(/\D/g, "").substring(0, 10); // First ten digits of input only
  const zip = input.substring(0, 3);
  const middle = input.substring(3, 6);
  const last = input.substring(6, 10);

  const code = value.startsWith("+") ? `(${zip})` : `${zip}-`;

  if (input.length > 6) {
    return `${code}${middle}-${last}`;
  } else if (input.length > 3) {
    return `${code} ${middle}`;
  } else if (input.length > 0) {
    return `${code}`;
  }

  return value;
};
