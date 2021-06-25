import { Container } from "typedi";
import LoggerInstance from "./logger";

export default ({ models }: { models: { name: string; model }[] }) => {
  try {
    models.forEach((m) => {
      Container.set(m.name, m.model);
    });

    Container.set("logger", LoggerInstance);

    return;
  } catch (e) {
    LoggerInstance.error("Error on dependency injector loader: %o", e);
    throw e;
  }
};
