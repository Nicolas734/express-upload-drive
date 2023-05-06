import { Router } from "express";
import driveRouter from "./driveRoutes";
import localRouter from "./localRoutes";


const routes = Router();

routes.get('/', (req, res)=> {res.json("ta funcionando :]")});
routes.use("/local", localRouter);
routes.use("/drive", driveRouter);

export default(routes);