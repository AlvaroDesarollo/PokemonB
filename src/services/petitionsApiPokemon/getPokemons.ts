import { provide } from '@config/ioc/inversify.config'
import { TYPES } from '@config/ioc/types'
import { IConfig } from '@config/vars'
import axios from 'axios'
import { inject } from 'inversify'
import { IApiPokemons } from '.'

@provide(TYPES.IGetPokemonApi)
export class ApiPokemonsService implements IApiPokemons {
  constructor(@inject(TYPES.IConfig) private config: IConfig) {}

  public get = async (nodo: string, filtros: any) => {
    const endpointUrl = `${this.config.getVars().back.urlParmsServices}/parms`
    const queryUrl = `${endpointUrl}/${nodo}?${filtros}`
    let callResponse: any
    try {
      callResponse = await axios.get(queryUrl)
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(
        `ApiPokemons:get - nodo: ${nodo} - filtros: ${filtros}  - error: ${error}`
      )
      throw new Error(`internal_server_error, Error:${error}`)
    }
    return ''
  }
}
