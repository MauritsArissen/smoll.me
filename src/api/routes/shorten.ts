import { celebrate } from "celebrate";
import { Router, Request, Response, NextFunction } from "express";
import Joi from "joi";
import { Container } from "typedi";
import { IUrlInputDTO } from "../../interfaces/IUrl";
import UrlService from "../../services/url";
import util from "../../util";

const route = Router();

export default (app: Router) => {
  app.use("/shorten", route);

  /**
   * @swagger
   * /shorten:
   *  post:
   *    description: Use to create a new shortened url
   *    tags: [Shorten]
   *    consumes:
   *      - application/json
   *    parameters:
   *      - name: request
   *        in: body
   *        required: true
   *        schema:
   *          type: object
   *          properties:
   *            longUrl:
   *              type: string
   *    responses:
   *      '201':
   *        description: Successfully created a new url
   */
  route.post(
    "/",
    celebrate({
      body: Joi.object().keys({
        longUrl: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const urlServiceInstance = Container.get(UrlService);
        const { url } = await urlServiceInstance.CreateUrl(
          req.body as IUrlInputDTO
        );
        return res.status(201).json({ url });
      } catch (e) {
        return util.handleCustomError(e, res, next);
      }
    }
  );
};
