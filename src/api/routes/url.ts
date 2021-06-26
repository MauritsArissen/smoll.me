import { Router, Request, Response } from "express";
import { Container } from "typedi";
import { IUrlInputDTO } from "../../interfaces/IUrl";
import UrlService from "../../services/url";
import util from "../../util";

const route = Router();

export default (app: Router) => {
  app.use("/", route);

  /**
   * @swagger
   * /{code}:
   *  get:
   *    description: Request data from urlCode
   *    tags: [Url]
   *    parameters:
   *      - in: path
   *        name: code
   *        schema:
   *          type: string
   *        required: true
   *    responses:
   *      '200':
   *        description: A successful response
   */
  route.get("/:code", async (req: Request, res: Response) => {
    try {
      const query: Partial<IUrlInputDTO> = { urlCode: req.params.code };
      const urlServiceInstance = Container.get(UrlService);
      const { url } = await urlServiceInstance.GetUrlByUrlCode(query);
      return res.redirect(url.longUrl);
    } catch (e) {
      return util.handleCustomError(e, res);
    }
  });
};
