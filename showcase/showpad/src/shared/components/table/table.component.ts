import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {TableColumn} from '~typings/table/table.interfaces';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {BehaviorSubject, of} from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  @Input() data: Array<any> = [];
  @Input() columns: Array<TableColumn> = [];
  @Input() pageSize = 0;
  @Input() page = 1;
  @Input() total = 0;
  @Input() loading = false;

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  @Output() navigate = new EventEmitter<number>();

  // dataSource$ = new BehaviorSubject(new MatTableDataSource<any>([]));

  constructor(private readonly cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    // this.dataSource$.next(new MatTableDataSource(this.data));
  }

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
    return true;
  }
}
