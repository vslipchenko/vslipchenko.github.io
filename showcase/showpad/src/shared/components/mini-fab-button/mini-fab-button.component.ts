import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-mini-fab-button',
  templateUrl: './mini-fab-button.component.html',
  styleUrls: ['./mini-fab-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniFabButtonComponent implements OnInit {
  @Input() color: ThemePalette;
  @Input() icon = '';
  @Input() disabled = false;

  @Output() clicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
