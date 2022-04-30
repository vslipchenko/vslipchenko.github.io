import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveDialogComponent {
  @Output() remove = new EventEmitter();
}
