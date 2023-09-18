export const parseFinnishDate = (isoDateString: string) => {
  const yyyy = isoDateString.substring(0, 4);
  const mm = isoDateString.substring(5, 7);
  const dd = isoDateString.substring(8, 10);
  return `${dd}.${mm}.${yyyy}`;
};
