import { Router } from "express";
import { methods as languageController } from "../controllers/language.controller";

const router = Router();

router
  .get("/", languageController.getLanguages)
  .get("/:id", languageController.getOneLanguage)
  .post("/", languageController.addLanguage)
  .put("/:id", languageController.updateLanguage)
  .delete("/:id", languageController.deleteLanguage);

export default router;
