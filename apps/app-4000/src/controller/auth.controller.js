import jwt from "jsonwebtoken";
import users from "../database/users.js";

export default class AuthController {
  constructor() {
    this.generateToken = this.generateToken.bind(this);
    this.verifyToken = this.verifyToken.bind(this);
    this.login = this.login.bind(this);
    this.profile = this.profile.bind(this);
  }

  generateToken(payload) {
    const access_token = jwt.sign(payload, "ABCD000012222KLU72221M776", {
      expiresIn: "1d",
      algorithm: "HS256",
      header: {
        kid: "sim2",
      },
    });
    const refresh_token = jwt.sign(payload, "XBCD000012222KLU72221M776", {
      expiresIn: "30d",
      algorithm: "HS256",
      header: {
        kid: "sim3",
      },
    });

    const decodedAccessToken = jwt.decode(access_token);

    return {
      accessToken: access_token,
      accessTokenExpiry: decodedAccessToken.exp,
      refreshToken: refresh_token,
    };
  }

  verifyToken(req) {
    const token = req.headers.authorization.split(" ")[1];

    return jwt.decode(token, "ABCD000012222KLU72221M776");
  }

  login(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return next(new Error("Username and Password are required"));
      }

      const user = users.find((user) => user.username === username);

      if (!user) {
        return next(new Error("User not found"));
      }

      res.send(this.generateToken({ id: user.id }));
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  profile(req, res, next) {
    try {
      const userPayload = this.verifyToken(req);

      const user = users.find((user) => user.id === userPayload.id);

      if (!user) {
        return next(new Error("User not found"));
      }

      res.send({
        message: "Profile ✅",
        data: {
          user,
        },
        success: true,
      });
    } catch (error) {
      return next(error);
    }
  }
}
