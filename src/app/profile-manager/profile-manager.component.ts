import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/models/Employee.model';
import { UserService } from 'app/services/users/user-service.service';
import { AgencesService } from 'app/services/agences/agences.service';
import { Utils } from 'app/util';
import { AgenceMapper } from 'app/mappers/agence-mapper';
import { Subject } from 'rxjs/Subject';
import { UserMapper } from '../mappers/employeeMapper';
import { UserFilter } from 'app/user-filter';

@Component({
  selector: 'profile-manager',
  templateUrl: './profile-manager.component.html',
  styleUrls: ['./profile-manager.component.scss']
})
export class ProfileManagerComponent implements OnInit {

  users: User[] = [];
  loadingUsers = false;
  agences = [];
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth() + 1;
  selectedYear = this.currentYear;
  selectedMonth = this.currentMonth;
  months = []
  years = [];
  keyword: string = "";
  userFilter$ = new Subject<UserFilter>();
  constructor(private router: Router, private userService: UserService, private agenceService: AgencesService) {
    let firstYear: number = 2020;
    do {
      this.years.push(firstYear);
      firstYear += 1;
    } while (firstYear <= this.currentYear);

    this.months = Utils.months
  }

  ngOnInit() {
    this.initAgences();
    this.hookSearche();
    this.userFilter$.next({
      date: null,
      keyword: ""
    } as UserFilter);
  }


  hookSearche() {

    this.userService.search(this.userFilter$)
      .subscribe(results => {
        this.users = results.map(u => UserMapper.map(u));
      });
  }
  loadUsers() {
    // this.loadingUsers = true;
    // this.userService
    //   .getUsers()
    //   .subscribe(
    //     users => this.populateUsers(users),
    //     error => { Utils.errorOccured(error); this.loadingUsers = false }
    //   );

  }
  populateUsers(users) {
    this.users = users;
    this.loadingUsers = false;
  }
  initAgences() {
    this.agenceService
      .getAgencesClient()
      .subscribe(
        agences => agences.map(agence => this.agences.push(AgenceMapper.mapForSelection(agence))),
        error => Utils.errorOccured(error)
      );
  }

  redirect() {
    this.router.navigate(["/user"]);
  }
  show(u: User) {
    this.router.navigate(["/user", u.id, "show"]);
  }

  edit(u: User) {
    this.router.navigate(["/user", u.id]);
  }

  remove(u: User) {

  }

  keyup(text) {
    this.keyword = text;
    this.search()
  }

  search() {
    this.userFilter$.next({
      date: `${this.selectedMonth}-${this.selectedYear}`,
      keyword: this.keyword
    } as UserFilter);
  }


}
