import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'ir-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill:Bill;
  @Input() currency: any;

  dollar: number;
  yen: number;

  constructor() { }

  ngOnInit() {
    const { rates } = this.currency;
    this.dollar = rates['USD']*this.bill.value;
    this.yen = rates['UAH']*this.bill.value;

    console.log(this.currency);
  }

}
