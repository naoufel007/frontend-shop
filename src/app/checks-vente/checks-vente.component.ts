import { Component, OnInit, Input } from '@angular/core';
import { CheckServiceService } from 'app/services/checks/check-service.service';
import { CheckWrapper } from 'app/models/CheckWrapper.model';
import { Utils } from 'app/util';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/pagination.component';

@Component({
  selector: 'checks-vente',
  templateUrl: './checks-vente.component.html',
  styleUrls: ['./checks-vente.component.scss']
})
export class ChecksVenteComponent implements OnInit {


  @Input()
  url: string = '';

  checkWrapper: CheckWrapper;
  loading = true;
  maxSize = 6;
  checkNumber:number
  constructor(private checksService: CheckServiceService) { }

  ngOnInit() {
    this.checksService.getChecks(this.url)
      .subscribe(
        wrapper => {
          this.checkWrapper = wrapper;
          this.loading = false
        },
        error => {
          console.log(error)
          Utils.errorOccured(error);
          this.loading = false;
        }
      );
  }

  pageChanged($event: PageChangedEvent){
    $event.page;
    this.checksService.getChecks(this.url, $event.page)
      .subscribe(
        wrapper => {
          this.checkWrapper = wrapper;
          this.loading = false
        },
        error => {
          console.log(error)
          Utils.errorOccured(error);
          this.loading = false;
        }
      );
  }

  filterChecks(){
    this.checksService.getChecks(this.url,null,this.checkNumber)
      .subscribe(
        wrapper => {
          this.checkWrapper = wrapper;
          this.loading = false
        },
        error => {
          console.log(error)
          Utils.errorOccured(error);
          this.loading = false;
        }
      );
  }

}
