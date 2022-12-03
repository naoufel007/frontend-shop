import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AgencesService } from 'app/services/agences/agences.service';
import { Agence } from 'app/models/Agence.model';
import { User } from 'app/models/Employee.model';
import { AgenceMapper } from 'app/mappers/agence-mapper';
import { Utils } from 'app/util';
import { UserService } from 'app/services/users/user-service.service';
import { Commission } from 'app/models/Commissions';
import { CommaExpr } from '@angular/compiler/src/output/output_ast';
import { Pourcentage } from 'app/models/Pourcentage';
import { Vente } from 'app/models/Vente.model';
import { Client } from 'app/models/client';
@Component({
  selector: 'detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {

  loading: boolean = true;
  loadingVentes = false;
  loadingAchats = false;
  loadingCommissions = false;
  user: User;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private agenceService: AgencesService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        let id = +params['id'];
        if (id) {
          this.userService
            .getUserById(id)
            .subscribe(
              user => this.populateUser(user),
              error => { this.loading = false; Utils.errorOccured(error); }
            );
        }
      }
    );


  }
  populateUser(u) {
    this.user = u;
    this.loadCommissions();
    this.loading = false
  }
  goBack() {
    this.router.navigate(["/users"]);
  }

  edit() {
    this.router.navigate(["/user", this.user.id]);
  }

  loadCommissions() {
    if (this.user.commissions.length == 0) {
      this.loadingCommissions = true;
      this.userService
        .loadCommissions(this.user.id)
        .subscribe(
          commissions => { this.user.commissions = commissions; this.loadingCommissions = false; },
          error => { this.loadingCommissions = false; Utils.errorOccured(error) }
        );
    }
  }

  loadAchats() {
    if (this.user.achats.length == 0) {
      this.loadingAchats = true;
      this.userService
        .loadAchats(this.user.id)
        .subscribe(
          achats => { this.user.achats = achats; this.loadingAchats = false },
          error => { this.loadingAchats = false; Utils.errorOccured(error) }
        );
    }
  }

  loadVentes() {
    // if (this.user.venteWrapper.ventes &&  this.user.venteWrapper.ventes.length == 0) {
    this.loadingVentes = true;
    this.userService
      .loadVentes(this.user.id)
      .subscribe(
        venteWrapper => {
          console.log("wrapper--", venteWrapper)
          this.user.venteWrapper = venteWrapper;
          this.loadingVentes = false;
        },
        error => {
          console.log(error)
          this.loadingVentes = false;
          Utils.errorOccured(error)
        }
      );
    // }
  }

  filterDate($dateQuery) {
    let observable;
    if ($dateQuery) {
      observable = this.userService
        .loadVentes(this.user.id, null, $dateQuery)
        
    }else{
      observable = this.userService
      .loadVentes(this.user.id)
    }
  
    observable.subscribe(
      wrapper => {
        console.log("wrapper", wrapper)
        this.user.venteWrapper = wrapper;
        //this.loading = false;
      },
      error => {
        console.log(error)
        //this.loading = false;
        Utils.errorOccured(error)
      }
    );
  }
  paginate($event: any) {
    // console.log("fetching page:",$event.page)
    //this.loading = true;
    if ($event) {
      this.userService
        .loadVentes(this.user.id, $event.event.page, $event.date)
        .subscribe(
          wrapper => {
            console.log("wrapper", wrapper)
            this.user.venteWrapper = wrapper;
            //this.loading = false;
          },
          error => {
            console.log(error)
            //this.loading = false;
            Utils.errorOccured(error)
          }
        );
    }else{}
  }

}
