import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WishlistComponent} from './wishlist.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '~shared/shared.module';

@NgModule({
  declarations: [WishlistComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: WishlistComponent,
      },
    ]),
    SharedModule,
  ],
})
export class WishlistModule {}
