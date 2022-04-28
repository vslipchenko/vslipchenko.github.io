import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {MatFormFieldAppearance} from '@angular/material/form-field/form-field';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() label = '';
  @Input() placeholder = '';

  constructor() {}

  ngOnInit(): void {}
}
