import { Router } from "express"
import { uploadDrive } from "../middlewares";
import { uplaodFileFromDrive } from "../controllers/uploadDrive"

const routes = Router();

routes.post('/upload', uploadDrive.single('foto'), uplaodFileFromDrive);

export default routes;