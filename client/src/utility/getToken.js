export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const getId = () => {
  const token = localStorage.getItem("id");
  return token;
};
