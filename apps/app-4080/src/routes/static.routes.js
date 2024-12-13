import express from "express";
import path from "node:path";

const router = express.Router();

const staticPath = `${process.cwd()}/public`;

router.get("/static/:filename", (req, res, next) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(staticPath, filename);
    res.sendFile(filePath, (err) => {
      if (err) {
        next(err);
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
