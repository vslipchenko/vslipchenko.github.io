import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  @Input() public title = '';
  @Input() public imageName = '';

  constructor() {}

  ngOnInit(): void {}
}