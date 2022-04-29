import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {PokemonService} from '~services/pokemon/pokemon.service';
import {BehaviorSubject, finalize, map, Observable, Subject, takeUntil} from 'rxjs';
import {NamedAPIResource} from 'pokenode-ts';
import {POKEMON_PAGE_SIZE} from '~constants/pokemon';
import {MatDialog} from '@angular/material/dialog';
import {RowMenuComponent} from '~shared/components/row-menu/row-menu.component';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsComponent implements OnInit, OnDestroy {
  pokemonData$ = new BehaviorSubject<{total: number; data: Array<any>}>(null as any);
  loading$ = new BehaviorSubject(true);
  pageSize = POKEMON_PAGE_SIZE;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly pokemonService: PokemonService, private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.getFilteredPokemonList$()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading$.next(false)),
      )
      .subscribe((list) => {
        this.pokemonData$.next(list);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openRowMenu(row: {name: string}): void {
    console.log(row);
    this.dialog.open(RowMenuComponent, {autoFocus: 'dialog'});
  }

  loadPage(page: number): any {
    this.loading$.next(true);

    this.getFilteredPokemonList$((page - 1) * POKEMON_PAGE_SIZE, POKEMON_PAGE_SIZE)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading$.next(false)),
      )
      .subscribe((list) => {
        this.pokemonData$.next(list);
      });
  }

  search(name: string): void {
    if (!name) return this.loadPage(1);

    this.loading$.next(true);

    this.pokemonService
      .getPokemonByName(name)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading$.next(false)),
      )
      .subscribe(
        (data) => {
          console.log(data);

          this.pokemonData$.next({
            total: 1,
            data: [{name: data.name}],
          });
        },
        () => {
          console.log('error');
          // TODO Pokemon not found
        },
      );
  }

  private getFilteredPokemonList$(offset = 0, limit = POKEMON_PAGE_SIZE): Observable<any> {
    return this.pokemonService.getPokemonList(offset, limit).pipe(
      map((list) => {
        return {
          total: list.count,
          data: list.results.map((pokemon: any) => {
            return {name: (pokemon as NamedAPIResource).name};
          }),
        };
      }),
    );
  }
}
