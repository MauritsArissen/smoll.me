import { Logger as _Logger } from "winston";

export default ({ logger }: { logger: _Logger }) => {
  logger.info("Smoll.me // Open-source url shortener");
};
