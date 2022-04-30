import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatFormFieldAppearance} from '@angular/material/form-field/form-field';
import {FormControl} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() color: ThemePalette;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() control = new FormControl();
  @Input() disabled = false;
}
