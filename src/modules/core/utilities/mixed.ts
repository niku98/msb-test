export const pascalCase = (str: string) => {
  if (!str.length) {
    return "";
  }

  const out = _camelCase(str);

  return out[0].toUpperCase() + out.slice(1);
};

export function makeId(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
