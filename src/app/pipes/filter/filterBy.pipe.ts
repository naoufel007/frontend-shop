import { Pipe, PipeTransform, keyframes } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(values: any, keyword:any,arg1,arg2): any {
    if(! values)
      return [];
    
    return values.filter( v => this.checkCommission(v,keyword,arg1,arg2));
  }

  checkCommission(v:any,keyword:any,arg1,arg2){
    let val1 = "";
    if(arg1 && arg1.includes(".")){
      val1 = v[arg1.split(".")[0]][arg1.split(".")[1]];
    }else{
      val1 = v[arg1];
    }
    return (val1.trim().toLowerCase().includes(keyword.toLowerCase()))
          || (v[arg2] && v[arg2].trim().toLowerCase().includes(keyword.toLowerCase()));
    //return v.produit.trim().toLowerCase().includes(keyword.toLowerCase()) || v.client.trim().toLowerCase().includes(keyword.toLowerCase());
  }
}
