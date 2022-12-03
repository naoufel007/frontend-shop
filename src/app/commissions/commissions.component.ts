import { Component, OnInit, Input } from '@angular/core';
import { Commission } from 'app/models/Commissions';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/pagination.component';
import { Paginable } from 'app/behaviors/paginable';
import { UserService } from 'app/services/users/user-service.service';
import { User } from 'app/models/Employee.model';

@Component({
  selector: 'commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.scss']
})
export class CommissionsComponent implements OnInit, Paginable {


  @Input()
  commissions: Commission[] = [];

  @Input()
  user: User;
  totalItems = 0;
  pagedArray: Commission[] = [];
  currentPage = 1;
  itemsPerPage: number = 10;
  maxSize: number = 5;
  date: Date = new Date();
  keyword = "";
  loadingCommissions = false;
  constructor(private commissionService: UserService) { }

  ngOnInit() {
    this.pagedArray = this.commissions.slice(0, this.itemsPerPage);
    this.totalItems = this.commissions.length
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.pagedArray = this.commissions.slice(startItem, endItem);
  }

  isPaginationDisplayed(): boolean {
    return this.commissions && this.commissions.length > this.itemsPerPage;
  }

  filterByDate(date) {
    this.date = date;
    this.currentPage = 1
    if (date) {
      let dateString = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      this.loadingCommissions = true;
      this.commissionService
        .loadCommissions(this.user.id, `date=${dateString}`)
        .subscribe(
          commissions => {
            this.commissions = commissions;
            this.pagedArray = this.commissions.slice(0, this.itemsPerPage);
            this.loadingCommissions = false;
          }
        )
      
    } else {
      this.commissionService
        .loadCommissions(this.user.id)
        .subscribe(
          commissions => {
            this.commissions = commissions;
            this.pagedArray = this.commissions.slice(0, this.itemsPerPage)
            this.loadingCommissions = false;
          }
        )
    }
  }

}
