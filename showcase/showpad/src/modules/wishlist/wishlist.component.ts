import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {StorageService} from '~services/storage/storage.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistComponent implements OnInit {
  pokemons: Array<string> = [];

  constructor(private readonly storageService: StorageService) {}

  ngOnInit(): void {
    this.pokemons = this.storageService.getList('wishlist');
  }
}
