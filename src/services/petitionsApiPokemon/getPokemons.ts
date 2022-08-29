import axios from 'axios'
import { inject } from 'inversify'
import { provide } from '../../config/ioc/inversify.config'
import { TYPES } from '../../config/ioc/types'
import { IConfig } from '../../config/vars'
import { IApiPokemons } from './index'

@provide(TYPES.IGetPokemonApi)
export class ApiPokemonsService implements IApiPokemons {
  constructor(@inject(TYPES.IConfig) private config: IConfig) {}

  public get = async (nodo: string, limit: any) => {
    const endpointUrl = `${this.config.getVars().back.urlGetPokemon}`
    const complemento = nodo
      ?`${endpointUrl}/${nodo}/`
      : `${endpointUrl}?limit=${limit}`
    let callResponse: any
    try {
      callResponse = await axios.get(complemento)
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(
        `ApiPokemons:get - nodo: ${nodo} - filtros: ${complemento}  - error: ${error}`
      )
      throw new Error(`internal_server_error, Error:${error}`)
    }
    if (callResponse.status === 200) {
      return callResponse.data
    }
    if (callResponse.status === 404) {
      return null
    }
    throw new Error(
      `${callResponse.status} - ${JSON.stringify(callResponse.data)}`
    )
  }

  public getPokemonBasic = async (url: string) => {
    const endpointUrl = url;
    let callResponse: any
    try {
      callResponse = await axios.get(endpointUrl)
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(
        `ApiPokemons:get - nodo: ${endpointUrl} - error: ${error}`
      )
      throw new Error(`internal_server_error, Error:${error}`)
    }
    if (callResponse.status === 200) {
      return callResponse.data
    }
    if (callResponse.status === 404) {
      return null
    }
    throw new Error(
      `${callResponse.status} - ${JSON.stringify(callResponse.data)}`
    )
  }
}
