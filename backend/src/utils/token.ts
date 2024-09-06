import CONFIG from "../config";
import jwt from "jsonwebtoken";

export async function verifyToken(token: string, secret: string, context) {
  // TODO: Actually verify the token in production
  if (process.env.NODE_ENV === "production") {
    return;
  }

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  try {
    jwt.verify(token, secret);
  } catch (err) {
    if (!(err instanceof jwt.TokenExpiredError)) {
      console.error("Token verification error:", err);
      context.res.clearCookie(CONFIG.AUTH_COOKIE_NAME);
      throw new Error("Invalid token");
    }

    try {
      // Verification failed, attempting to refresh the token
      const fetchRes = await fetch(
        `${CONFIG.AUTH_BACKEND_URI}/api/login/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        },
      );

      if (!fetchRes.ok) {
        throw new Error("Token refresh failed");
      }

      const { accessToken } = await fetchRes.json();
      context.res.cookie(CONFIG.AUTH_COOKIE_NAME, accessToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });

      context.req.cookies[CONFIG.AUTH_COOKIE_NAME] = accessToken;

      // Verify the new token
      jwt.verify(accessToken, secret);
    } catch (refreshError) {
      console.error("Token refresh error:", refreshError);
      context.res.clearCookie(CONFIG.AUTH_COOKIE_NAME);
      throw new Error("Token refresh failed");
    }
  }
}
