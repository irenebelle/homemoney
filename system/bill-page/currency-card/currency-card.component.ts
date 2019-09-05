import { Component, Input } from '@angular/core';

@Component({
  selector: 'ir-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent  {

  @Input() currency: any;

  
  currencies: string[] = ['USD', 'UAH'];

  

}
