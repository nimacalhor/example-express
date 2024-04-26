import hpp from "hpp";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import connectToMongoDB from "./db";
import mongoSanitize from "express-mongo-sanitize";
import mediaRouter from "@media/router/media.router";
import { isDev } from "@global/helpers/general.helper";
import settingRouter from "@setting/router/setting.router";
import profileRouter from "@profile/router/profile.router";
import commentRouter from "@comment/router/comment.router";
import accountRouter from "@account/router/account.router";
import validateApiKey from "@auth/middlewares/validateApiKey.mw";
import notFErrorMiddleware from "@errors/middlewares/notFError.mw";
import defaultErrorMiddleware from "@errors/middlewares/defaultError.mw";
import mongooseErrorMiddleware from "@errors/middlewares/mongooseError.mw";
import routeNotFound from "@src/modules/global/middlewares/routeNotFound.mw";
import validationErrorMiddleware from "@errors/middlewares/validationError.mw";
import getValidateAndParseMiddleware from "./modules/global/middlewares/bodyParser.mw";

const xss = require("xss-clean");

const PORT = process.env.PORT;

async function createApp() {
  try {
    await connectToMongoDB();
    const app = express();

    app.use(cors());
    app.use(validateApiKey);

    // necessary middlewares
    if (isDev()) app.use(morgan("dev"));
    app.use(helmet());
    app.use(xss());
    app.use(hpp());
    app.use(mongoSanitize());
    app.use(getValidateAndParseMiddleware(express));

    // router middlewares
    app.use("/accounts", accountRouter);
    app.use("/media", mediaRouter);
    app.use("/profiles", profileRouter);
    app.use("/comments", commentRouter);
    app.use("/setting", settingRouter);
    app.use(routeNotFound);

    // error handling middlewares
    app.use(validationErrorMiddleware);
    app.use(notFErrorMiddleware);
    app.use(mongooseErrorMiddleware);
    app.use(defaultErrorMiddleware);

    const server = app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );

    return server;
  } catch (error) {
    console.error("Error handling MongoDB connection:", error);
  }
}

export default createApp;
