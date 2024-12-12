import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.router.js";
import publicRoutes from "./routes/public.routes.js";
import staticRoutes from "./routes/static.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "Server Is Up and Running ✅",
    success: true,
  });
});

app.use("/auth", authRoutes);
app.use("/public", publicRoutes);
app.use(staticRoutes);

app.use((error, req, res, next) => {
  res.status(res.statusCode || 500).send({
    message: error.message ?? "Internal Server Error",
    success: false,
  });
});

app.listen(4000, () => {
  console.log("Server is running on port http://localhost:4000 ✅");
});
