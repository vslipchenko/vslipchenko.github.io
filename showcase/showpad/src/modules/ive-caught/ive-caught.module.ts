import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IveCaughtComponent} from './ive-caught.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    IveCaughtComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: IveCaughtComponent,
      },
    ]),
  ],
})
export class IveCaughtModule {
}
