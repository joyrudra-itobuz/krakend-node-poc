import users from "../database/users.js";

export default class PublicController {
  getPublicData(req, res, next) {
    try {
      res.send({
        message: "Public Route ✅",
        data: {
          users,
        },
        success: true,
      });
    } catch (error) {
      return next(error);
    }
  }
}
