import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {StorageService} from '~services/storage/storage.service';
import {RemoveDialogComponent} from '~shared/components/remove-dialog/remove-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-ive-caught',
  templateUrl: './ive-caught.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IveCaughtComponent implements OnInit {
  pokemons$ = new BehaviorSubject<Array<string>>([]);
  LIST_NAME = 'ive-caught';

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
