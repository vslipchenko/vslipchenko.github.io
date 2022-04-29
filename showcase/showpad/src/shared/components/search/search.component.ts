import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();

  control = new FormControl();
  active = false;

  get emptyValue(): boolean {
    return !this.control.value;
  }

  searchValue(): void {
    this.active = true;
    this.search.emit(this.control.value);
  }

  reset(): void {
    this.active = false;
    this.control.setValue('');
    this.search.emit('');
  }
}
