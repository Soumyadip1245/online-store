export const nowiso = () => {
  return dtiso(new Date());
};
export const dtiso = (dt) => {
  return dt.toISOString();
};
