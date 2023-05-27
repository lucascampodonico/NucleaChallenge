import { Router } from "express";

const router = Router();

router.get("/", (req, res) =>
  res.render("index", { title: "Nuclea Challenge" })
);

export default router;
