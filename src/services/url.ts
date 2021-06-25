import { Inject, Service } from "typedi";
import {
  InternalServerError,
  InvalidInputError,
  NotFoundError,
} from "../config/errors";
import { IUrl, IUrlInputDTO } from "../interfaces/IUrl";
import { isUri } from "valid-url";
import { nanoid } from "nanoid";
import config from "../config";

@Service()
export default class UrlService {
  constructor(
    @Inject("urlModel") private urlModel: Models.UrlModel,
    @Inject("logger") private logger
  ) {}

  public async GetUrlByUrlCode(
    urlInputDTO: Partial<IUrlInputDTO>
  ): Promise<{ url: IUrl }> {
    try {
      this.logger.silly("Fetching url from db");

      // Find url in db
      const urlRecord = await this.urlModel.findOne(urlInputDTO);
      if (!urlRecord) throw new NotFoundError("Url not found");

      const url = urlRecord.toObject();
      return { url };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async CreateUrl(
    urlInputDTO: Partial<IUrlInputDTO>
  ): Promise<{ url: IUrl }> {
    try {
      this.logger.silly("Creating user db record");

      // Return database record if longUrl is already shortened
      var urlRecord = await this.urlModel.findOne(urlInputDTO);
      if (urlRecord) {
        const url = urlRecord.toObject();
        return { url };
      }

      // Validating urls
      if (!isUri(urlInputDTO.longUrl)) {
        throw new InvalidInputError("Long url is not a valid url");
      }

      const urlCode = nanoid(6);

      // Save the url to the database
      urlRecord = await this.urlModel.create({
        ...urlInputDTO,
        urlCode,
        date: new Date(),
      });

      if (!urlRecord) {
        throw new InternalServerError("Url cannot be created");
      }

      const url = urlRecord.toObject();
      return { url };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
