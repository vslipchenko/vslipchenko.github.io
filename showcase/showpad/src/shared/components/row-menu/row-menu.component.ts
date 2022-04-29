import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-row-menu',
  templateUrl: './row-menu.component.html',
  styleUrls: ['./row-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowMenuComponent {
  @Output() open = new EventEmitter();
  @Output() addToWishlist = new EventEmitter();
  @Output() addToIveCaught = new EventEmitter();
}
