
import { buildProviderModule, container } from './inversify.config'

/* REST Controllers */
import '../../routes/v1/petitions/login.controller'
import '../../routes/v1/petitions/petitions.controller'

/* Services */
import '../../services/petitionsApiPokemon/getPokemons'
import '../../services/pokemons/pokemon'



container.load(buildProviderModule())
