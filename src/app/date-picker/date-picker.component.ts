import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import {frLocale} from 'ngx-bootstrap/locale';
@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  @Input()
  bsValue;
  @Output()
  picked=new EventEmitter<any>();
  locale = "fr";
  locales = defineLocale(this.locale,frLocale);
  bsConfig: Partial<BsDatepickerConfig>;
  colorTheme = "theme-blue";
  constructor(private _localeService: BsLocaleService) {
    this._localeService.use(this.locale);
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
   }
  ngOnInit() {
    this.picked.emit(null);
  }

  valueChanged(date){
    this.picked.emit(date);
  }

resetFilter(){
    this.bsValue = null;
    this.picked.emit(this.bsValue);
  }
}
