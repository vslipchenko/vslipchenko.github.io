import {EventEmitter} from '@angular/core';
import {ThemePalette} from '@angular/material/core';

export interface Button {
  color: ThemePalette;
  icon: string;
  disabled: boolean;
  clicked: EventEmitter<void>;
}
