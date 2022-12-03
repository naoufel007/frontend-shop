import { Component, OnInit,Output,Input,EventEmitter } from '@angular/core';
import { Profile } from 'app/models/profile.model';
import * as swal from 'sweetalert';
import { Predicate } from '@angular/core/src/debug/debug_node';
@Component({
  selector: 'new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.scss']
})
export class NewProfileComponent implements OnInit {

  @Output()
  cancel: EventEmitter<Profile> = new EventEmitter<Profile>();

  @Output()
  create :EventEmitter<Profile> = new EventEmitter<Profile>();

  newProfile:Profile = {} as Profile;
  constructor() { }

  ngOnInit() {
  }

  createProfile(){
    this.create.emit(this.newProfile);
  }
  cancelProfile(){
    sweetAlert("Êtes-vous sûr de vouloir annuler?","",
                "warning",{
                  buttons: ["Non", "Oui"],
                  dangerMode:true
                }).then((willCancel)=>{
                  this.newProfile = {} as Profile;
                  this.cancel.emit();
                });
    
  }
}
