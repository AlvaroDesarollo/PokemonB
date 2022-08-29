import { IConfig } from '@config/vars'
import { inject } from 'inversify'
import { provide } from 'inversify-binding-decorators'
import pretty from 'pretty'
import { TYPES } from '../../config/ioc/types'
import { IApiPokemons } from '../petitionsApiPokemon'
import { IPokemonService } from './index'

@provide(TYPES.IPokemonService)
export class Pokemon implements IPokemonService {
  public detallesPokemon: any = {}
  constructor(
    @inject(TYPES.IConfig) private config: IConfig,
    @inject(TYPES.IGetPokemonApi) private getPokemonApi: IApiPokemons
  ) {}
  public getDetailPokemon = async (payload: any): Promise<any> => {
    const id = payload.id
    const detailPokemon = await this.getPokemonApi.get(id, '')

    const detallesPokemon = this.detailBasicosPokemon(detailPokemon)
    const habilidades = this.getHabilidadesPokemon(detailPokemon)
    const tipo = this.getTipoPokemon(detailPokemon)
    const especie = this.getEspeciePokemon(detailPokemon)
    const arrayPromises = [detallesPokemon, habilidades, tipo, especie]
    
    await Promise.all(arrayPromises)

    const result = {
      data: this.detallesPokemon,
    }
    return result
  }

  public getPokemons = async (payload: any): Promise<any> => {
    const limit = this.config.getVars().back.limitPokemon
    const pokemones = await this.getPokemonApi.get('', limit)
    let result = {}
    if (pokemones.results.length === 0) {
      result = {
        data: [],
      }
    }
    const dataPokemon: any = await this.orderDataPokemon(pokemones.results)

    result = {
      data: dataPokemon,
    }

    return result
  }

  // TODO: Para Order Pokemones
  private orderDataPokemon = async (pokemons: any) => {
    const dataPokemon: any = []
    pokemons.forEach((pokemon: any, index: number) => {
      dataPokemon.push(this.getPokemonApi.getPokemonBasic(pokemon.url))
    })
    const result = await Promise.all(dataPokemon)
    const resultPokemon: any = []
    result.map((detailPokemon: any) => {
      resultPokemon.push({
        alto: detailPokemon.height / 10,
        avatar: detailPokemon.sprites.other['official-artwork'].front_default,
        id: detailPokemon.id,
        image: detailPokemon.sprites.other.dream_world.front_default,
        nombre: `${detailPokemon.name[0].toUpperCase()}${detailPokemon.name.substring(
          1
        )}`,
        peso: detailPokemon.weight / 10,
      })
    })
    return resultPokemon
  }

  // TODO: Traer Detalles Pokemones

  private detailBasicosPokemon = async (pokemon: any): Promise<any> => {
    // let resultPokemon: any = {}
    // const result = await this.getPokemonApi.getPokemonBasic(pokemon.url)

    this.detallesPokemon = {
      alto: pokemon.height / 10,
      avatar: pokemon.sprites.other['official-artwork'].front_default,
      experiencia: pokemon.base_experience,
      id: pokemon.id,
      image: pokemon.sprites.other.dream_world.front_default,
      nombre: `${pokemon.name[0].toUpperCase()}${pokemon.name.substring(1)}`,
      peso: pokemon.weight / 10,
    }
    return true
  }
  private getHabilidadesPokemon = async (pokemon: any): Promise<any> => {
    const habilidadesPokemon: any = []
    pokemon.abilities.forEach((habilidad: any) => {
      habilidadesPokemon.push(
        this.getPokemonApi.getPokemonBasic(habilidad.ability.url)
      )
    })
    const result = await Promise.all(habilidadesPokemon)
    const resultHabilidades: any = []
    result.map((detailHabilidad: any) => {
      detailHabilidad.names.map((habilidadNombre: any) => {
        if (habilidadNombre.language.name === 'es') {
          resultHabilidades.push(habilidadNombre.name)
        }
      })
    })
    this.detallesPokemon.habilidades = resultHabilidades
    return true
  }

  private getTipoPokemon = async (pokemon: any): Promise<any> => {
    const tipoPokemon: any = []
    pokemon.types.forEach((tipo: any) => {
      tipoPokemon.push(this.getPokemonApi.getPokemonBasic(tipo.type.url))
    })
    const result = await Promise.all(tipoPokemon)
    const resultTipo: any = []
    result.map((detailTipo: any) => {
      detailTipo.names.map((tipoNombre: any) => {
        if (tipoNombre.language.name === 'es') {
          resultTipo.push(tipoNombre.name)
        }
      })
    })
    this.detallesPokemon.tipo = resultTipo
    return true
  }

  private getEspeciePokemon = async (pokemon: any): Promise<any> => {
    const especiePokemon: any = await this.getPokemonApi.getPokemonBasic(
      pokemon.species.url
    )
    const colorPokemon: string = especiePokemon.color.name
    const evolucionData: any = await this.getPokemonApi.getPokemonBasic(
      especiePokemon.evolution_chain.url
    )
    const evolucionPokemon: string = `${evolucionData.chain.evolves_to[0].species.name[0].toUpperCase()}${evolucionData.chain.evolves_to[0].species.name.substring(
      1
    )}`
    let generoPokemon: string = ''
    especiePokemon.genera.forEach((genero: any) => {
      if (genero.language.name === 'es') {
        generoPokemon = genero.genus
      }
    })
    this.detallesPokemon.color = colorPokemon
    this.detallesPokemon.evolucion = evolucionPokemon
    this.detallesPokemon.genero = generoPokemon
    return true
  }
}
