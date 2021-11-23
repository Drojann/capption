import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface InventarioItem {
  name: string;
  id: number;
  type: string;
  quantity: number;
  price: number;
}

// TODO: replace this with real data from your application
const DATA: InventarioItem[] = [
  {id: 1, name: 'Hydrogen', type: 'comida', quantity: 9, price: 200},
  {id: 2, name: 'Helium', type: 'comida', quantity: 1, price: 200},
  {id: 3, name: 'Lithium', type: 'abarrotes', quantity: 10, price: 200},
  {id: 4, name: 'Beryllium', type: 'abarrotes', quantity: 8, price: 100},
  {id: 4, name: 'Beryllium', type: 'abarrotes', quantity: 8, price: 100},
  {id: 5, name: 'Boron', type: 'abarrotes', quantity: 10, price: 30},
  {id: 6, name: 'Carbon', type: 'abarrotes', quantity: 7, price: 10},
  {id: 7, name: 'Nitrogen', type: 'abarrotes', quantity: 10, price: 200},
  {id: 8, name: 'Oxygen', type: 'abarrotes', quantity: 20, price: 50},
  {id: 9, name: 'Fluorine', type: 'comida', quantity: 10, price: 40},
  {id: 10, name: 'Neon', type: 'comida', quantity: 100, price: 130},
  {id: 11, name: 'Sodium', type: 'comida', quantity: 44, price: 150},
  {id: 12, name: 'Magnesium', type: 'comida', quantity: 16, price: 200},
  {id: 13, name: 'Aluminum', type: 'material', quantity: 15, price: 200},
  {id: 14, name: 'Silicon', type: 'material', quantity: 10, price: 300},
  {id: 15, name: 'Phosphorus', type: 'material', quantity: 2, price: 100},
  {id: 16, name: 'Sulfur', type: 'material', quantity: 2, price: 200},
  {id: 17, name: 'Chlorine', type: 'material', quantity: 3, price: 150},
  {id: 18, name: 'Argon', type: 'servicio', quantity: 3, price: 100},
  {id: 19, name: 'Potassium', type: 'servicio', quantity: 101, price: 10},
  {id: 20, name: 'Calcium', type: 'servicio', quantity: 33, price: 100},
];

/**
 * Data source for the Inventario view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class InventarioDataSource extends DataSource<InventarioItem> {
  data: InventarioItem[] = DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<InventarioItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: InventarioItem[]): InventarioItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: InventarioItem[]): InventarioItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'price': return compare (+a.price, +b.price, isAsc)
        case 'type': return compare (a.type, b.type, isAsc)
        case 'quantity': return compare(+a.quantity, +b.quantity, isAsc)
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
