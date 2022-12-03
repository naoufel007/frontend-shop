import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    adminOnly : boolean;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Tableau de bord',  icon: 'dashboard', class: '', adminOnly:false },
    { path: 'historique', title: 'Historique',  icon: 'history', class: '', adminOnly:true },
    { path: 'users', title: 'Gestion de utilisateur',  icon:'person', class: '', adminOnly:false },
    { path: 'fournisseurs', title: 'Liste fournisseurs',  icon:'content_paste', class: '', adminOnly:false },
    { path: 'stock', title: 'Gestion du stock',  icon:'storage', class: '', adminOnly:false },
    { path: 'achats', title: 'Achats',  icon:'add_circle', class: '', adminOnly:false },
    { path: 'ventes', title: 'Ventes',  icon:'remove_circle', class: '', adminOnly:false },
    { path: 'clients', title: 'Clients',  icon:'people', class: '', adminOnly:false },
    { path: 'retours', title: 'Retours',  icon:'people', class: '', adminOnly:false },
    { path: 'services', title: 'Bon de services',  icon:'notifications', class: '' , adminOnly:false},
    { path: 'charges', title: 'Caisse',  icon:'account_balance_wallet', class: '', adminOnly:true },
    { path: 'statistics', title: 'Statistiques',  icon:'trending_up', class: '', adminOnly:true },
    { path: 'checks-ui', title: 'Chèques',  icon:'account_balance_wallet', class: '', adminOnly:true },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  isAdmin;
  constructor() { }

  ngOnInit() {
    this.isAdmin = localStorage.getItem('role') === 'admin';
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
