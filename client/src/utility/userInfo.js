import { jwtDecode } from "jwt-decode";

export const getUserInfoFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    const { authClaims } = decodedToken;
    const { userName, email } = authClaims;
    return { userName, email };
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
