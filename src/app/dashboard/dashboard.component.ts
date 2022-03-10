import { Component, NgZone, OnInit, VERSION } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';

import { Pipe, PipeTransform } from '@angular/core';
import { ApiProviderService } from '../api-provider.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  public transform(value, keys: string, term: string) {
    if (!term) return value;
    return (value || []).filter((item) =>
      keys
        .split(',')
        .some(
          (key) =>
            item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])
        )
    );
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  name: any = 'Angular ' + VERSION.major;
  myControl = new FormControl();
  options: string[] = []; //= ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  user: any;
  userDetails: any = null;
  hide = true;
  history: any[] = [];
  constructor(
    public apiProvider: ApiProviderService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private zone: NgZone
  ) {}

  ngOnInit() {
    /*  this.filteredOptions = this.user.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    ); */
    this.getHistory();
  }
  private _filter(value): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  openDialog(val) {
    if (val.success) {
      const dialogRef = this.dialog.open(ProfileComponent, {
        width: '50%',
        data: val,
      });

      dialogRef.afterClosed().subscribe((result) => {});
    }
  }

  searchUser() {
    this.userDetails = null;
    if (this.user != null && this.user.trim() != '') {
      this.apiProvider.getSinglekey(this.user).then((data) => {
        console.log('search = ', this.user, data);
        if (data.length == 0) {
          this.apiProvider.getUser(this.user).subscribe((res) => {
            if (res) {
              console.log('res = ', res);
              this.userDetails = res.success ? res : null;
              this.apiProvider.add(res);
            }
          });
        } else {
          this.userDetails = data[0];
        }
      });
    }
  }

  getHistory() {
    this.apiProvider.keys().then((res) => {
      this.history = res;
    });
  }

  delHist(hist) {
    this.apiProvider.del(hist.login).then((res) => {
      this.zone.run(() => {
        this.snackBar
          .open('User Deleted Successfully', hist.login)
          ._dismissAfter(3000);
      });
    });
  }
}
