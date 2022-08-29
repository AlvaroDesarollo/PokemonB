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

import { TYPES } from '../../../config/ioc/types'
import { validationSchema } from './login.model'
@controller('/login')
export class LoginController implements interfaces.Controller {
  constructor() {
    //
  }
  @httpPost('/')
  public async petition(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() nextFunc: express.NextFunction
  ) {
    const payload = req.body
    // tslint:disable-next-line: no-console
    console.log('llega payload::::', payload)
    const validationResult = joi.validate(payload, validationSchema)

    if (validationResult.error) {
      // tslint:disable-next-line:no-console
      console.error(
        `POST /v1/builder - Formato de request invalido: ${validationResult.error}`
      )
      res.status(422).json({ errors: ['invalid_request'] })
      nextFunc()
      return
    }
    try {
      const httpResponse: any = true
      res.json(httpResponse)
      nextFunc()
    } catch (err) {
      // tslint:disable-next-line: no-console
      console.error(`Post /v1/Login - Error: ${JSON.stringify(err)}`)
      res.status(500).json({ errors: ['internal_server_error'] })
      nextFunc()
      return
    }
  }
}
