import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  @Input() public multi = true;
  @Input() public panels: Array<{title: string; body: string}> = [];
}
