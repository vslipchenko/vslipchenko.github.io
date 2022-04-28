import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PokemonsComponent} from './pokemons.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "~shared/shared.module";


@NgModule({
  declarations: [
    PokemonsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PokemonsComponent,
      },
    ]),
    SharedModule
  ]
})
export class PokemonsModule {
}
