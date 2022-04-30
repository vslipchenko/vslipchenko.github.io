import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {Button} from '~typings/button/button.interfaces';

@Component({
  selector: 'app-mini-fab-button',
  templateUrl: './mini-fab-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniFabButtonComponent implements Button {
  @Input() color: ThemePalette;
  @Input() icon = '';
  @Input() disabled = false;

  @Output() clicked = new EventEmitter();
}
