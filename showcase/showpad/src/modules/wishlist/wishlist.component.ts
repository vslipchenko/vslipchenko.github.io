import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {StorageService} from '~services/storage/storage.service';
import {MatDialog} from '@angular/material/dialog';
import {RemoveDialogComponent} from '~shared/components/remove-dialog/remove-dialog.component';
import {BehaviorSubject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistComponent implements OnInit {
  pokemons$ = new BehaviorSubject<Array<string>>([]);

  constructor(private readonly storageService: StorageService, private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.pokemons$.next(this.storageService.getList('wishlist'));
  }

  openRemoveDialog(): void {
    const dialog = this.dialog.open(RemoveDialogComponent);

    dialog.componentInstance.remove.pipe(takeUntil(dialog.afterClosed())).subscribe(() => this.removeAll());
  }

  private removeAll(): void {
    this.storageService.resetList('wishlist');
    this.pokemons$.next([]);
  }
}
