import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {PokemonService} from '~services/pokemon/pokemon.service';
import {BehaviorSubject, finalize, map, Observable, Subject, takeUntil} from 'rxjs';
import {NamedAPIResource} from 'pokenode-ts';
import {POKEMON_PAGE_SIZE} from '~constants/pokemon';
import {MatDialog} from '@angular/material/dialog';
import {RowMenuComponent} from '~shared/components/row-menu/row-menu.component';
import {SnackbarService} from '~services/snackbar/snackbar.service';
import {Router} from '@angular/router';
import {Destroyable} from '~typings/component/component.interfaces';
import {StorageService} from '~services/storage/storage.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsComponent implements OnInit, Destroyable {
  pokemonData$ = new BehaviorSubject<{total: number; data: Array<any>}>(null as any);
  loading$ = new BehaviorSubject(true);
  pageSize = POKEMON_PAGE_SIZE;

  destroy$ = new Subject<void>();

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly dialog: MatDialog,
    private readonly snackbarService: SnackbarService,
    private readonly router: Router,
    private readonly storageService: StorageService,
  ) {}

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
    const dialog = this.dialog.open(RowMenuComponent, {autoFocus: 'dialog'});

    dialog.componentInstance.open
      .pipe(takeUntil(dialog.afterClosed()))
      .subscribe(() => this.navigatePokemonProfile(row.name));
    dialog.componentInstance.addToWishlist
      .pipe(takeUntil(dialog.afterClosed()))
      .subscribe(() => this.addToWishlist(row.name));
    dialog.componentInstance.addToIveCaught
      .pipe(takeUntil(dialog.afterClosed()))
      .subscribe(() => this.addToIveCaught(row.name));
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
          this.pokemonData$.next({
            total: 1,
            data: [{name: data.name}],
          });
        },
        () => {
          this.snackbarService.open('Pokemon with such a name is not found', 'OK');
        },
      );
  }

  private navigatePokemonProfile(name: string): void {
    void this.router.navigate([`/pokemon/${name}`]);
  }

  private addToWishlist(name: string): void {
    this.storageService.saveToList('wishlist', name);
    this.snackbarService.open('Pokemon was successfully added to Wishlist', 'OK');
  }

  private addToIveCaught(name: string): void {
    this.storageService.saveToList('ive-caught', name);
    this.snackbarService.open("Pokemon was successfully added to I've caught", 'OK');
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
