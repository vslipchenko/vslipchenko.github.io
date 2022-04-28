import {Injectable} from '@angular/core';
import {MainClient, NamedAPIResourceList} from 'pokenode-ts';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly api = new MainClient();

  constructor() {}

  getPokemonList(offset: number, limit: number): Observable<NamedAPIResourceList> {
    return from(this.api.pokemon.listPokemons(offset, limit));
  }
}
