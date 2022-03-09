import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import { openDB, deleteDB, wrap, unwrap } from 'idb';
import { error } from '@angular/compiler/src/util';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class ApiProviderService {
  private userStore$ = new BehaviorSubject<any>([]);
  user$ = this.userStore$.asObservable();
  private _dataChange: Subject<any> = new Subject<any>();
  private _dbPromise;

  db: any;
  request: any;
  productsStore: any;
  transactions: any;

  dbPromise = openDB('True-North', 1, {
    upgrade(db) {
      db.createObjectStore('users', { keyPath: 'login' });
    },
  });

  constructor(
    private httpClient: HttpClient,
    public snackBar: MatSnackBar,
    private zone: NgZone
  ) {
    /*  this.request = self.indexedDB.open('TrueNorth', 1);

    this.request.onsuccess = function (event: any) {
      // some sample products data
      /*  var products = [
        { id: 1, name: 'Red Men T-Shirt', price: '$3.99' },
        { id: 2, name: 'Pink Women Shorts', price: '$5.99' },
        { id: 3, name: 'Nike white Shoes', price: '$300' },
      ]; * /

      // get database from event
      this.db = event.target.result;

      // create transaction from database
      this.transactions = this.db.transaction('users', 'readwrite');

      // add success event handleer for transaction
      // you should also add onerror, onabort event handlers
      this.transactions.onsuccess = function (event) {
        console.log('[Transaction] ALL DONE!');
      };

      // get store from transaction
      this.productsStore = this.transactions.objectStore('users');

      /*************************************/
    // put products data in productsStore
    /* products.forEach(function (product) {
        var db_op_req = this.productsStore.add(product);

        db_op_req.onsuccess = function (event) {
          console.log(event.target.result == product.id); // true
        };
      }); */
    // count number of objects in store
    /* this.productsStore.count().onsuccess = function (event) {
        console.log(
          '[Transaction - COUNT] number of products in store',
          event.target.result
        );
      }; * /
    };

    this.request.onerror = function (event) {
      console.log('[onerror]', this.request.error);
    };

    this.request.onupgradeneeded = function (event) {
      var db = event.target.result;
      this.productsStore = db.createObjectStore('users', { keyPath: 'login' });
    }; */
  }
  async add(val) {
    return (await this.dbPromise).add('users', val);
  }
  async update(key, val) {
    return (await this.dbPromise).put('users', val, key);
  }
  async del(key) {
    return (await this.dbPromise).delete('users', key);
  }
  async clear() {
    return (await this.dbPromise).clear('users');
  }
  async keys() {
    return (await this.dbPromise).getAll('users');
  }
  async getSinglekey(val) {
    return (await this.dbPromise).getAll('users', val);
  }

  getUser(val) {
    return this.httpClient
      .get<any>('https://api.github.com/users/' + val, { observe: 'response' })
      .pipe(
        tap((response) => console.log(response)),
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            console.error('error status = ', error.status);
            // console.log('---> filter:', req.params.get('filter'));

            if (error.status == 404) {
              // redirect to error page
              // OR you can use a toast
              // console.error('No such user');

              this.zone.run(() => {
                this.snackBar
                  .open('No such user exists', val)
                  ._dismissAfter(3000);
              });

              this.add({ login: val, success: false });
            }
          }
          return throwError(error);
        }),
        map((response) => {
          console.log(response);
          if (response.status == 200) {
            response.body.success = true;
            this.userStore$.next(response.body);
            return response.body;
          } else {
          }
        })
      );
    // .subscribe((res)=>{return res;});
  }
}
