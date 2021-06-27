import Logger from "./logger";
import mongooseLoader from "./mongoose";
import expressLoader from "./express";
import modelLoader from "./model";
import swaggerLoader from "./swagger";
import dependencyInjectorLoader from "./dependencyInjector";
import welcomeLoader from "./welcome";
import clientLoader from "./client";

export default async ({ expressApp }) => {
  await welcomeLoader({ logger: Logger });

  await mongooseLoader();
  Logger.info("DB loaded and connected!");

  const modelsList: { name: string; model }[] = modelLoader();
  Logger.info("Loaded models list");

  await dependencyInjectorLoader({
    models: modelsList,
  });
  Logger.info("Dependency Injector loaded");

  await swaggerLoader({ app: expressApp });
  Logger.info("Swagger loaded");

  await expressLoader({ app: expressApp });
  Logger.info("Express loaded");

  await clientLoader({ app: expressApp });
  Logger.info("Client loaded");
};
