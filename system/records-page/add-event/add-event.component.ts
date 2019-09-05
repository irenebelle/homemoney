import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { NgForm } from '@angular/forms';
import { IREvent } from '../../shared/models/event.model';
import * as moment from 'moment';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { mergeMap } from 'rxjs/operators';
import { Message } from '../../../shared/models/message.model';

@Component({
  selector: 'ir-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[] = [];
  types =[
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  message: Message;

  constructor(
    private eventsService: EventsService,
    private billServise: BillService
    ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => this.message.text ='', 3000);
  }

  onSubmit(form: NgForm) {
    let {amount, description, category, type} = form.value;
    if(amount<0) amount *=-1;
    const event = new IREvent(
      type, amount, +category, 
      moment().format('DD.MM.YYYY HH:mm:ss'), 
      description);
      this.billServise.getBill()
      .subscribe((bill: Bill) => {
        let value = 0;
        if(type === 'outcome') {
          if(amount > bill.value) {
            this.showMessage(`Денег нет ${amount - bill.value}`);
              return;
          } else {
            value = bill.value - amount;
          }

        } else {
          value = bill.value + amount;
        }
        this.billServise.updateBill({value: value, currency: bill.currency})
        .pipe(mergeMap(()=>this.eventsService.addEvent(event)))
        .subscribe(()=> {
          form.setValue({
            amount: 0,
            description: ' ',
            category: 1,
            type: 'outcome'
          });
        });

      });

  }

}
