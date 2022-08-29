export interface IApiPokemons {
    get(nodo: string, filtros: string): Promise<any>,
    getPokemonBasic(url: string): Promise<any>,
  }