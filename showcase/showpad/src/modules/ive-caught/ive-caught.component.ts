import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ive-caught',
  templateUrl: './ive-caught.component.html',
  styleUrls: ['./ive-caught.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IveCaughtComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
