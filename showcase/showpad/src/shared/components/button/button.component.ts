import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Button} from '~typings/button/button.interfaces';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements Button {
  @Input() color: ThemePalette;
  @Input() text = '';
  @Input() icon = '';
  @Input() disabled = false;

  @Output() clicked = new EventEmitter();
}
