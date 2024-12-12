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
    return jwt.sign(payload, "ABCD000012222KLU72221M776", {
      expiresIn: "1h",
    });
  }

  verifyToken(req) {
    const token = req.headers.authorization.split(" ")[1];
    return jwt.verify(token, "ABCD000012222KLU72221M776");
  }

  login(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return next(new Error("Username and Password are required"));
      }

      const user = users.find((user) => user.username === username);

      console.log("Here", user);

      if (!user) {
        return next(new Error("User not found"));
      }

      res.send({
        message: "Login Route ✅",
        data: {
          token: this.generateToken({ id: user.id, username }),
          user,
        },
        success: true,
      });
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
