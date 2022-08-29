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
// import { IApiPokemons } from '../../../services/petitionsApiPokemon/index'
import { IPokemonService } from '../../../services/pokemons/index'

import { TYPES } from '../../../config/ioc/types'

@controller('/getPokemons')
export class PetitionsController implements interfaces.Controller {
  constructor(
    @inject(TYPES.IPokemonService)
    private pokemonService: IPokemonService
  ) {}
  @httpPost('/')
  public async petition(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() nextFunc: express.NextFunction
  ) {
    const payload = req.body
    // tslint:disable-next-line: no-console
    console.log('llega payload::::', payload)
    try {
      const result = await this.pokemonService.getPokemons(payload)
      const httpResponse: any = result.data
      res.json(httpResponse)
      nextFunc()
    } catch (err) {
      // tslint:disable-next-line: no-console
      console.error(`Post /v1/getPokemons - Error: ${JSON.stringify(err)}`)
      res.status(500).json({ errors: ['internal_server_error'] })
      nextFunc()
      return
    }
  }

  @httpPost('/id')
  public async petitionById(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() nextFunc: express.NextFunction
  ) {
    const payload = req.body
    // tslint:disable-next-line: no-console
    console.log('llega payload::::', payload)
    try {
      const result = await this.pokemonService.getDetailPokemon(payload)
      const httpResponse: any = result.data
      res.json(httpResponse)
      nextFunc()
    } catch (err) {
      // tslint:disable-next-line: no-console
      console.error(`Post /v1/getPokemons - Error: ${JSON.stringify(err)}`)
      res.status(500).json({ errors: ['internal_server_error'] })
      nextFunc()
      return
    }
  }

}
