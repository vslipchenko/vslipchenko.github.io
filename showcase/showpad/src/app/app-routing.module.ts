import {PokemonsModule} from '~modules/pokemons/pokemons.module';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeModule} from '~modules/home/home.module';
import {WishlistModule} from '~modules/wishlist/wishlist.module';
import {IveCaughtModule} from '~modules/ive-caught/ive-caught.module';
import {ProfileModule} from '~modules/profile/profile.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<typeof HomeModule> => import('~modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'pokemons',
    loadChildren: (): Promise<typeof PokemonsModule> =>
      import('~modules/pokemons/pokemons.module').then((m) => m.PokemonsModule),
  },
  {
    path: 'wishlist',
    loadChildren: (): Promise<typeof WishlistModule> =>
      import('~modules/wishlist/wishlist.module').then((m) => m.WishlistModule),
  },
  {
    path: 'ive-caught',
    loadChildren: (): Promise<typeof IveCaughtModule> =>
      import('~modules/ive-caught/ive-caught.module').then((m) => m.IveCaughtModule),
  },
  {
    path: 'pokemon/:name',
    loadChildren: (): Promise<typeof ProfileModule> =>
      import('~modules/profile/profile.module').then((m) => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
