import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PokemonService} from '~services/pokemon/pokemon.service';
import {BehaviorSubject, finalize, Subject, takeUntil} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {SnackbarService} from '~services/snackbar/snackbar.service';
import {Destroyable} from '~typings/component/component.interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements Destroyable {
  loading$ = new BehaviorSubject(true);
  name = '';
  pokemon: {stats: Array<{name: string; base_stat: number}>; moves: Array<string>} = {} as any;
  panels: Array<{title: string; body: string}> = [];

  destroy$ = new Subject<void>();

  constructor(
    private readonly pokemonService: PokemonService,
    private route: ActivatedRoute,
    private readonly snackbarService: SnackbarService,
  ) {
    this.name = (this.route.snapshot.params as {name: string}).name;
  }

  ngOnInit(): void {
    this.pokemonService
      .getPokemonByName(this.name)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading$.next(false)),
      )
      .subscribe(
        (pokemon) => {
          const moves = pokemon.moves.map((item) => item.move.name);
          const stats = pokemon.stats.map((item) => item.stat.name);

          this.panels = [
            {title: 'Stats', body: moves.join(', ')},
            {title: 'Moves', body: stats.join(', ')},
          ];
        },
        () => {
          this.snackbarService.open("Can't load pokemon's profile. Please try again later.", 'OK');
        },
      );
  }
}
