import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TableListComponent } from './table-list/table-list.component';
import { NewProfileComponent } from './new-profile/new-profile.component';
import { ListFournisseurComponent } from './list-fournisseur/list-fournisseur.component';
import { NewFournisseurComponent } from './new-fournisseur/new-fournisseur.component';
import { ListProfileComponent } from './list-profile/list-profile.component';
import { FournisseurManagerComponent } from './fournisseur-manager/fournisseur-manager.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FournisseurService } from 'app/services/fournisseur.service';
import { DetailsFournisseurComponent } from './details-fournisseur/details-fournisseur.component';
import { DateFilterPipePipe } from './pipes/date-filter-pipe.pipe';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DpickerComponent } from './dpicker/dpicker.component';
import { SumPipe } from './pipes/sum/sum-pipe.pipe';
import { AgenceComponent } from './agence/agence.component';
import { AgenceAchatsComponent } from './agence-achats/agence-achats.component';
import { AgenceEmployeesComponent } from './agence-employees/agence-employees.component';
import { AgenceVentesComponent } from './agence-ventes/agence-ventes.component';
import { EmployeesPipe } from './pipes/employees/employees.pipe';
import { AchatsPipe } from './pipes/achats/achats.pipe';
import { VentesPipe } from './pipes/ventes/ventes.pipe';
import { SpinnerComponent } from './spinner/spinner.component';
import { AgencesService } from 'app/services/agences/agences.service';
import { AgencePipe } from './pipes/agences/agence.pipe';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { StockManagerComponent } from './stock-manager/stock-manager.component';
import { ProduitComponent } from './produit/produit.component';
import { ProduitsService } from 'app/services/produits/produits.service';
import { AchatsManagerComponent } from './achats-manager/achats-manager.component';
import { AchatComponent } from './achat/achat.component';
import { AchatsService } from 'app/services/achat/achats.service';
import { AchatListComponent } from './achat-list/achat-list.component';
import { SalesManagerComponent } from './sales-manager/sales-manager.component';
import { SalesService } from 'app/services/sales/sales-service.service';
import { VenteListComponent } from './vente-list/vente-list.component';
import { SaleComponent } from './sale/sale.component';
import { EmployeesService } from 'app/services/employees/employees.service';
import { DetailVenteComponent } from './detail-vente/detail-vente.component';
import { EditAchatComponent } from './edit-achat/edit-achat.component';
import { ClientsManagerComponent } from './clients-manager/clients-manager.component';
import { ClientService } from 'app/services/client/client.service';
import { ClientPipe } from './pipes/client.pipe';
import { ClientComponent } from './client/client.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ProfileManagerComponent } from './profile-manager/profile-manager.component';
import { ProfileComponent } from './profile/profile.component';
import { UserService } from 'app/services/users/user-service.service';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { CommissionsComponent } from './commissions/commissions.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DatePipe } from './pipes/date/date.pipe';
import { FilterByPipe } from './pipes/filter/filterBy.pipe';
import { PourcentagesComponent } from './pourcentages/pourcentages.component';
import { MonoAgencePipe } from './pipes/mono-agence/mono-agence.pipe';
import { RetourManagerComponent } from './retour-manager/retour-manager.component';
import { RetourListComponent } from './retour-list/retour-list.component';
import { RetourComponent } from './retour/retour.component';
import { TypesVenteComponent } from './components/types-vente/types-vente.component';
import { TypeProduitComponent } from './components/type-produit/type-produit.component';
import { ProduitDetailsComponent } from './produit-details/produit-details.component';
import { VenteLineComponent } from './vente-line/vente-line.component';
import { AchatLineComponent } from './achat-line/achat-line.component';
import { TotalPipe } from './pipes/total/total.pipe';
import { SalesDetailsComponent } from './sales-details/sales-details.component';
import { RetourService } from 'app/services/retour/retour.service';
import { HttpClientModule} from '@angular/common/http';
import { HttpClientService } from './services/http/http-client.service';
import { HistoryComponent } from './history/history.component';
import { LoginHistoryService } from './services/history/login-history.service';
import { AuthModule } from './modules/auth/auth.module';
import { VentePaymentComponent } from './vente-payment/vente-payment.component';
import { CreditListComponent } from './credit-list/credit-list.component';
import { CreditPaimentListComponent } from './credit-paiment-list/credit-paiment-list.component';
import { ClientVentesListComponent } from './client-ventes-list/client-ventes-list.component';
import { PaimentsService } from './services/credit/paiments.service';
import { BusinessServiceComponent } from './business-service/business-service.component';
import { BusinessServiceService } from './services/business-service.service';
import { NewServiceComponent } from './new-service/new-service.component';
import { ChargeComponent } from './charge/charge.component';
import { ChargesService } from './services/charges/charges.service';
import { ListChargesComponent } from './list-charges/list-charges.component';
import { NewChargeComponent } from './new-charge/new-charge.component';
import { TypeChargeComponent } from './components/type-charge/type-charge/type-charge.component';
import { EditChargeComponent } from './edit-charge/edit-charge.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { IoChartComponent } from './io-chart/io-chart.component';
import { ProductsChartComponent } from './products-chart/products-chart.component';
import { EmployeesChartComponent } from './employees-chart/employees-chart.component';
import { ChartsService } from './services/charts/charts.service';
import { AchatPaymentComponent } from './achat-payment/achat-payment.component';
import { DetailAchatComponent } from './detail-achat/detail-achat.component';
import { ProductHistoryComponent } from './product-history/product-history.component';
import { ProductHistoryService } from './services/product-history/product-history.service';
import { ProductHistoryAchatsComponent } from './product-history-achats/product-history-achats.component';
import { ProductHistoryVentesComponent } from './product-history-ventes/product-history-ventes.component';
import { SalePaymentsComponent } from './sale-payments/sale-payments.component';
import { ChecksUiComponent } from './checks-ui/checks-ui.component';
import { ChecksVenteComponent } from './checks-vente/checks-vente.component';
import { CheckServiceService } from './services/checks/check-service.service';
import { DetailRetoursComponent } from './detail-retours/detail-retours.component';
import { PdfGeneratorService } from './services/pdf/pdf-generator.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TableListComponent,
    NewProfileComponent,
    ListFournisseurComponent,
    NewFournisseurComponent,
    ListProfileComponent,
    FournisseurManagerComponent,
    FilterPipe,
    DetailsFournisseurComponent,
    DateFilterPipePipe,
    DpickerComponent,
    SumPipe,
    AgenceComponent,
    AgenceAchatsComponent,
    AgenceEmployeesComponent,
    AgenceVentesComponent,
    EmployeesPipe,
    AchatsPipe,
    VentesPipe,
    SpinnerComponent,
    AgencePipe,
    MultiselectComponent,
    StockManagerComponent,
    ProduitComponent,
    AchatsManagerComponent,
    AchatComponent,
    AchatListComponent,
    SalesManagerComponent,
    VenteListComponent,
    SaleComponent,
    DetailVenteComponent,
    EditAchatComponent,
    ClientsManagerComponent,
    ClientPipe,
    ClientComponent,
    ClientDetailsComponent,
    ProfileManagerComponent,
    ProfileComponent,
    DetailUserComponent,
    CommissionsComponent,
    DatePickerComponent,
    DatePipe,
    FilterByPipe,
    PourcentagesComponent,
    MonoAgencePipe,
    RetourManagerComponent,
    RetourListComponent,
    RetourComponent, 
    TypesVenteComponent,
    TypeProduitComponent,
    ProduitDetailsComponent,
    VenteLineComponent,
    AchatLineComponent,
    TotalPipe,
    SalesDetailsComponent,
    HistoryComponent,
    VentePaymentComponent,
    CreditListComponent,
    CreditPaimentListComponent,
    ClientVentesListComponent,
    BusinessServiceComponent,
    NewServiceComponent,
    ChargeComponent,
    ListChargesComponent,
    NewChargeComponent,
    TypeChargeComponent,
    EditChargeComponent,
    StatisticsComponent,
    IoChartComponent,
    ProductsChartComponent,
    EmployeesChartComponent,
    AchatPaymentComponent,
    DetailAchatComponent,
    ProductHistoryComponent,
    ProductHistoryAchatsComponent,
    ProductHistoryVentesComponent,
    SalePaymentsComponent,
    ChecksUiComponent,
    ChecksVenteComponent,
    DetailRetoursComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    RouterModule,
    AppRoutingModule,
    AngularMultiSelectModule,
    ModalModule,
    HttpClientModule,
    AuthModule
  ],
  providers: [
    FournisseurService,
    EmployeesService,
    AgencesService,
    ProduitsService,
    AchatsService,
    SalesService,
    ClientService,
    UserService,
    RetourService,
    HttpClientService,
    LoginHistoryService,
    PaimentsService,
    BusinessServiceService,
    ChargesService,
    ChartsService,
    ProductHistoryService,
    CheckServiceService,
    PdfGeneratorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
