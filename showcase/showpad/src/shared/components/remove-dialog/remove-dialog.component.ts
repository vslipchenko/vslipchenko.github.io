import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveDialogComponent {
  @Output() remove = new EventEmitter();
}
