import {Injectable} from '@angular/core';
import {NamedAPIResourceList, Pokemon, PokemonClient} from 'pokenode-ts';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly api = new PokemonClient();

  getPokemonList(offset: number, limit: number): Observable<NamedAPIResourceList> {
    return from(this.api.listPokemons(offset, limit));
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    return from(this.api.getPokemonByName(name));
  }
}
