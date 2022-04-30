import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {StorageService} from '~services/storage/storage.service';

@Component({
  selector: 'app-ive-caught',
  templateUrl: './ive-caught.component.html',
  styleUrls: ['./ive-caught.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IveCaughtComponent implements OnInit {
  pokemons: Array<string> = [];

  constructor(private readonly storageService: StorageService) {}

  ngOnInit(): void {
    this.pokemons = this.storageService.getList('ive-caught');
  }
}
