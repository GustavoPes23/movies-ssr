import { jwtDecode } from "jwt-decode";

export default class Jwt {
  public static isExpired(token?: string): boolean {
    if (!token) {
        return true;
    }

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    return decoded.exp! < currentTime;
  }
}
