import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FournisseurManagerComponent } from 'app/fournisseur-manager/fournisseur-manager.component';
import { DetailsFournisseurComponent } from 'app/details-fournisseur/details-fournisseur.component';
import { StockManagerComponent } from 'app/stock-manager/stock-manager.component';
import { ProduitComponent } from 'app/produit/produit.component';
import { AchatsManagerComponent } from 'app/achats-manager/achats-manager.component';
import { AchatComponent } from 'app/achat/achat.component';
import { SalesManagerComponent } from 'app/sales-manager/sales-manager.component';
import { SaleComponent } from 'app/sale/sale.component';
import { EditAchatComponent } from 'app/edit-achat/edit-achat.component';
import { ClientsManagerComponent } from 'app/clients-manager/clients-manager.component';
import { ClientComponent } from 'app/client/client.component';
import { ClientDetailsComponent } from 'app/client-details/client-details.component';
import { ProfileComponent } from 'app/profile/profile.component';
import { ProfileManagerComponent } from 'app/profile-manager/profile-manager.component';
import { DetailUserComponent } from 'app/detail-user/detail-user.component';
import { ProduitDetailsComponent } from 'app/produit-details/produit-details.component';
import { RetourManagerComponent } from 'app/retour-manager/retour-manager.component';
import { RetourComponent } from 'app/retour/retour.component';
import { HistoryComponent } from './history/history.component';
import { AfterLoginService } from './modules/auth/services/after-login.service';
import { BeforeLoginService } from './modules/auth/services/before-login.service';
import { LoginComponent } from './modules/auth/login/login.component';
import { CreditPaimentListComponent } from './credit-paiment-list/credit-paiment-list.component';
import { BusinessServiceComponent } from './business-service/business-service.component';
import { NewServiceComponent } from './new-service/new-service.component';
import { ChargeComponent } from './charge/charge.component';
import { NewChargeComponent } from './new-charge/new-charge.component';
import { EditChargeComponent } from './edit-charge/edit-charge.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailAchatComponent } from './detail-achat/detail-achat.component';
import { DetailVenteComponent } from './detail-vente/detail-vente.component';
import { ChecksUiComponent } from './checks-ui/checks-ui.component';
import { DetailRetoursComponent } from './detail-retours/detail-retours.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' ,canActivate: [AfterLoginService]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AfterLoginService] },
  { path: 'users', component: ProfileManagerComponent, canActivate: [AfterLoginService] },
  { path: 'user', component: ProfileComponent, canActivate: [AfterLoginService] },
  { path: 'user/:id', component: ProfileComponent, canActivate: [AfterLoginService] },
  { path: 'user/:id/show', component: DetailUserComponent, canActivate: [AfterLoginService] },
  { path: 'fournisseurs', component: FournisseurManagerComponent, canActivate: [AfterLoginService] },
  { path: 'detail-fournisseur/:id', component: DetailsFournisseurComponent, canActivate: [AfterLoginService] },
  { path: 'stock', component: StockManagerComponent , canActivate: [AfterLoginService]},
  { path: 'produit/:id/:action', component: ProduitComponent , canActivate: [AfterLoginService]},
  { path: 'detail-produit/:id', component: ProduitDetailsComponent , canActivate: [AfterLoginService]},
  { path: 'produit/new', component: ProduitComponent, canActivate: [AfterLoginService] },
  { path: 'achats', component: AchatsManagerComponent , canActivate: [AfterLoginService]},
  { path: 'achats/new', component: AchatComponent , canActivate: [AfterLoginService]},
  { path: 'achats/:id', component: EditAchatComponent , canActivate: [AfterLoginService]},
  { path: 'detail-achat/:id', component: DetailAchatComponent , canActivate: [AfterLoginService]},
  { path: 'ventes', component: SalesManagerComponent , canActivate: [AfterLoginService]},
  { path: 'ventes/new', component: SaleComponent , canActivate: [AfterLoginService]},
  { path: 'ventes/:id', component: SaleComponent , canActivate: [AfterLoginService]},
  { path: 'detail-vente/:id', component: DetailVenteComponent , canActivate: [AfterLoginService]},
  { path: 'clients', component: ClientsManagerComponent, canActivate: [AfterLoginService] },
  { path: 'client', component: ClientComponent , canActivate: [AfterLoginService]},
  { path: 'client/:id', component: ClientComponent , canActivate: [AfterLoginService]},
  { path: 'client/:id/show', component: ClientDetailsComponent , canActivate: [AfterLoginService]},
  { path: 'retours', component: RetourManagerComponent, canActivate: [AfterLoginService] },
  { path: 'retours/:id', component: RetourComponent , canActivate: [AfterLoginService]},
  { path: 'detail-retour/:id', component: DetailRetoursComponent , canActivate: [AfterLoginService]},
  { path: 'historique', component: HistoryComponent , canActivate: [AfterLoginService]},
  { path: 'login', component: LoginComponent, canActivate: [BeforeLoginService] },
  { path: 'credit/:id/paiments', component: CreditPaimentListComponent, canActivate: [AfterLoginService] },
  { path: 'services', component: BusinessServiceComponent, canActivate: [AfterLoginService] },
  { path: 'new-service', component: NewServiceComponent, canActivate: [AfterLoginService] },
  { path: 'charges', component: ChargeComponent, canActivate: [AfterLoginService] },
  { path: 'new-charge/:agenceId', component: NewChargeComponent, canActivate: [AfterLoginService] },
  { path: 'edit-charge/:chargeId', component: EditChargeComponent, canActivate: [AfterLoginService] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AfterLoginService] },
  { path: 'checks-ui', component: ChecksUiComponent, canActivate: [AfterLoginService] },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { 
      useHash : true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
