import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {StorageService} from '~services/storage/storage.service';
import {MatDialog} from '@angular/material/dialog';
import {RemoveDialogComponent} from '~shared/components/remove-dialog/remove-dialog.component';
import {BehaviorSubject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistComponent implements OnInit {
  pokemons$ = new BehaviorSubject<Array<string>>([]);
  LIST_NAME = 'wishlist';

  constructor(private readonly storageService: StorageService, private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.pokemons$.next(this.storageService.getList(this.LIST_NAME));
  }

  openRemoveDialog(): void {
    const dialog = this.dialog.open(RemoveDialogComponent);

    dialog.componentInstance.remove.pipe(takeUntil(dialog.afterClosed())).subscribe(() => this.removeAll());
  }

  private removeAll(): void {
    this.storageService.resetList(this.LIST_NAME);
    this.pokemons$.next([]);
  }
}
