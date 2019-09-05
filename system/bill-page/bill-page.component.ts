import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { Observable, Subscription } from 'rxjs';
import { Bill } from '../shared/models/bill.model';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'ir-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  currency: any;
  bill: Bill;
  isLoaded = false;

  constructor(private  billService: BillService) { }

  ngOnInit() {
     const subscription = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency());
      subscription.subscribe((data: [Bill, any]) => {
        this.bill= data[0];
        this.currency = data[1];
        this.isLoaded=true;

    });
  }

  onRefresh() {
    this.isLoaded = false;
    this.billService.getCurrency().subscribe((currency: any) => {
      this.currency = currency;
      this.isLoaded = true;

    });


  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}
