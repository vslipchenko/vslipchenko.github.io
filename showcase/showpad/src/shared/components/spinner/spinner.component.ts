import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  @Input() public color: ThemePalette;
  @Input() public mode: ProgressSpinnerMode = 'indeterminate';
  @Input() public strokeWidth = 4;
}
