import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PokemonService} from '~services/pokemon/pokemon.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  constructor(private readonly pokemonService: PokemonService) {}

  ngOnInit(): void {}
}
