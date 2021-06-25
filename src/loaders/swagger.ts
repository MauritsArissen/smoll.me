import express from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import config from "../config";

export default ({ app }: { app: express.Application }) => {
  const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "Smoll.me API docs",
        description: "All the rest api calls for smoll.me",
        contact: {
          name: "Maurits Arissen",
        },
        servers: [`https://smoll.me`],
      },
      host: `smoll.me`,
      basePath: config.api.version + config.api.prefix,
      schemes: ["https"],
      tags: [
        {
          name: "Url",
          description: "Handles /url path",
        },
        {
          name: "Shorten",
          description: "Handles /shorten path",
        },
      ],
    },
    apis: ["./src/api/routes/*.ts", "./api/routes/*.js"],
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
