import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsComponent {
  @Input() chips: Array<string> = [];
  @Input() color: ThemePalette;
}
