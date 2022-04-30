import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PokemonService} from '~services/pokemon/pokemon.service';
import {BehaviorSubject, finalize} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  loading$ = new BehaviorSubject(true);
  name = '';
  pokemon: {stats: Array<{name: string; base_stat: number}>; moves: Array<string>} = {} as any;

  constructor(private readonly pokemonService: PokemonService, private route: ActivatedRoute) {
    this.name = (this.route.snapshot.params as {name: string}).name;
  }

  ngOnInit(): void {
    this.pokemonService
      .getPokemonByName('ditto')
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe((pokemon) => {
        console.log(pokemon);
      });
  }
}
