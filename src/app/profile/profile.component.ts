import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AgencesService } from 'app/services/agences/agences.service';
import { Agence } from 'app/models/Agence.model';
import { User } from 'app/models/Employee.model';
import { AgenceMapper } from 'app/mappers/agence-mapper';
import { Utils } from 'app/util';
import { UserService } from 'app/services/users/user-service.service';
import { ProduitsService } from 'app/services/produits/produits.service';
import { Pourcentage } from 'app/models/Pourcentage';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit { 

  editMode: boolean = false;
  user: User = {} as User;
  selectedAgence = [];
  agences = [];
  loading:boolean = true;
  agenceSettings = {
    singleSelection: true,
    text: "Selectionner une agence",
    searchPlaceholderText: "Rechercher une agence",
    noDataLabel: "Aucun agence trouvée",
    enableSearchFilter: true,
    classes: "myclass custom-class"
  };
  constructor(private router: Router,
    private route: ActivatedRoute,
    private agenceService: AgencesService,
    private userService: UserService,
    private produitService: ProduitsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        let id = +params['id'];
        if (id) {
          // edit user
          this.loading = true;
          this.editMode = true;
          this.userService
              .getUserById(id)
              .subscribe(
                user => this.populateUser(user)
              );
        } else {
          //create new user
          this.editMode = false;
          this.loading = false;
        }

        this.agenceService
          .getAgencesClient()
          .subscribe(
          agences => agences.map(agence => 
            {
              if(agences.length == 1){
                this.selectedAgence[0] = {
                  itemName: agences[0].name,
                  id: agences[0].id
                };
              }
              return this.agences.push(AgenceMapper.mapForSelection(agence));
            }
          ),
          error => Utils.errorOccured(error)
          );
      }
    );
  }
  populateUser(user:User){
    this.user = user;
    this.selectedAgence = [];
    this.selectedAgence.push(AgenceMapper.mapForSelection(user.agence));
    this.loading = false;
  }
  selectAgence(agence){
    this.user.agence = agence as Agence;
  }
  getTitre() {
    if (this.editMode)
      return "Modification de l'utilisateur";
    return "Ajout d'un nouveau utilisateur";
  }

  create() {
    try {
      this.userService.createUser(this.user)
        .subscribe(
        user => Utils.success(this.router, ["/users"], "L'utilisateur a bien été ajouté"),
        error => Utils.errorOccured(error)
        );
    } catch (e) {
      Utils.error(e);
    }
  }

  update() {
    try {
      this.userService.updateUser(this.user)
        .subscribe(
        user => Utils.success(this.router, ["/users"], "L'utilisateur a bien été modifié"),
        error => Utils.errorOccured(error)
        );
    } catch (e) {
      Utils.error(e);
    }
  }

  cancel() {
    Utils.cancel(this.router, ["/users"]);
  }
}
