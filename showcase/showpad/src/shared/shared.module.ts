import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './components/table/table.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MiniFabButtonComponent} from './components/mini-fab-button/mini-fab-button.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {InputComponent} from './components/input/input.component';
import {MatInputModule} from '@angular/material/input';
import {SearchComponent} from './components/search/search.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [TableComponent, MiniFabButtonComponent, InputComponent, SearchComponent, SpinnerComponent],
  exports: [TableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
