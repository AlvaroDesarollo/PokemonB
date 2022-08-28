// import { TYPES } from '@config/ioc/types'
// import { IResponse } from '@models/response.model'
// import { IBuilderService } from '@services/builder'
import * as express from 'express'
import { inject } from 'inversify'
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
  next,
  request,
  response,
} from 'inversify-express-utils'
import joi from 'joi'
// import { builderSchema } from './builder.model'

@controller('/getPokemons')
export class PetitionsController implements interfaces.Controller {
    constructor() {

    }
    @httpPost('/')
    public async petition(
        @request() req: express.Request,
        @response() res: express.Response,
        @next() nextFunc: express.NextFunction
    ) {
        const payload = req.body
        console.log('llega payload::::', payload);
        const httpResponse: any = {
            data: {},
          }
          res.json(httpResponse)
          nextFunc()
    }

}