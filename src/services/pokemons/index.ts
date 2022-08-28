export interface IPokemonService {
  getDetailPokemon(payload: any): Promise<any>
  getPokemons(payload: any): Promise<any>
}
