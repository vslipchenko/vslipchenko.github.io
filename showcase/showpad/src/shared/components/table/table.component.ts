import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {TableColumn} from '~typings/table/table.interfaces';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() data: Array<any> = [];
  @Input() columns: Array<TableColumn> = [];
  @Input() visibleColumns: Array<string> = [];
  @Input() hint = '';
  @Input() pageSize = 0;
  @Input() page = 1;
  @Input() total = 0;
  @Input() loading = false;

  @Output() navigate = new EventEmitter<number>();
  @Output() search = new EventEmitter<string>();
  @Output() rowClicked = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  navigatePreviousPage(): number {
    return (this.page -= 1);
  }

  navigateNextPage(): number {
    return (this.page += 1);
  }

  get canNavigatePrevious(): boolean {
    return this.page !== 1;
  }

  get canNavigateNext(): boolean {
    const totalPages = this.total / this.pageSize;

    return this.page < totalPages;
  }
}
