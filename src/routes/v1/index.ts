import { Router } from "express";
import authRouter from "./authRoute";
import chatRouter from "./chatRoute";
import loaderRouter from "./loaderRoute";
import knowledgeRouter from "./knowledgeRoute";
import healthRouter from "./healthRoute";

const appRouter = Router();

const appRoutes = [
  {
    path: "/auth",
    router: authRouter,
  },
  {
    path: "/chat",
    router: chatRouter,
  },
  {
    path: "/loader",
    router: loaderRouter,
  },
  {
    path: "/knowledge",
    router: knowledgeRouter,
  },
  {
    path: "/health-check",
    router: healthRouter,
  }
];

appRoutes.forEach((route) => {
  appRouter.use(route.path, route.router);
});

export default appRouter;
