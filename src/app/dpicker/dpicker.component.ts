import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import {frLocale} from 'ngx-bootstrap/locale';

@Component({
  selector: 'dpicker',
  templateUrl: './dpicker.component.html',
  styleUrls: ['./dpicker.component.scss']
})
export class DpickerComponent implements OnInit {

  @Input()
  minDate:Date;
  @Input()
  maxDate:Date;

  @Output()
  picked:EventEmitter<Date[]> = new EventEmitter<Date[]>();

  locale = "fr";
  locales = defineLocale(this.locale,frLocale);
  bsConfig: Partial<BsDatepickerConfig>;
  colorTheme = "theme-blue";
  constructor(private _localeService: BsLocaleService) {
    this._localeService.use(this.locale);
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
   }

  ngOnInit() {
  }

  valueChanged(dates:Date[]){
    this.picked.emit(dates);
  }

  resetFilter(){
    this.maxDate = this.minDate = null;
    this.picked.emit([this.minDate,this.maxDate]);
  }

}
