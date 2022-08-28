import { TYPES } from '@config/ioc/types'
import { IConfig } from '@config/vars'
import { inject } from 'inversify'
import { provide } from 'inversify-binding-decorators'
import pretty from 'pretty'
import { IPokemonService } from '.'


@provide(TYPES.IPokemonService)
export class Pokemon implements IPokemonService {
    constructor(
        @inject(TYPES.IConfig) private config: IConfig,
    ) {

    }
    public getDetailPokemon = async(payload: any):Promise<any> => {
        return ''
    } 
    public getPokemons = async(payload: any):Promise<any> => {
        return ''
    }
}