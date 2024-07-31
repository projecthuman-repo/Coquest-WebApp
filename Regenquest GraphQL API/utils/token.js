const jwt = require("jsonwebtoken");

async function verifyToken(token, secret, context) {
  // TODO: Actually verify the token in production
  if (process.env.NODE_ENV === "production") {
    return;
  }

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  try {
    await jwt.verify(token, secret);
  } catch (err) {
    // If failed, attempt to verify attempt to refresh the token
    if (err.name === "TokenExpiredError") {
      try {
        const fetchRes = await fetch(
          `${process.env.REACT_APP_AUTH_API_URI}/api/login/token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: token }),
          },
        );

        if (fetchRes.ok) {
          const { accessToken } = await fetchRes.json();
          context.res.cookie(process.env.AUTH_COOKIE_NAME, accessToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            path: "/",
          });

          context.req.cookies[process.env.AUTH_COOKIE_NAME] = accessToken;

          // Verify the new token
          await jwt.verify(accessToken, secret);
        } else {
          context.res.clearCookie(process.env.AUTH_COOKIE_NAME);
          throw new Error("Token refresh failed");
        }
      } catch (refreshError) {
        console.error("Token refresh error:", refreshError);
        context.res.clearCookie(process.env.AUTH_COOKIE_NAME);
        throw new Error("Token refresh failed");
      }
    } else {
      console.error("Token verification error:", err);
      context.res.clearCookie(process.env.AUTH_COOKIE_NAME);
      throw new Error("Invalid token");
    }
  }
}

module.exports = {
  verifyToken,
};
