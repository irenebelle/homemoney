import { Component, OnInit } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { EventsService } from '../shared/services/events.service';
import { CategoriesService } from '../shared/services/category.service';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { IREvent } from '../shared/models/event.model';


@Component({
  selector: 'ir-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit {

  isLoaded = false;
  bill: Bill;
  categories: Category [] = [];
  events: IREvent[] = [];

  constructor(
    private billService: BillService,
    private eventsService: EventsService,
    private categoriesService: CategoriesService
    ) { }



  ngOnInit() {
   const subscription =  combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvent());

    subscription.subscribe((data: [Bill, Category[], IREvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];

      this.isLoaded = true;


    });

  }

  getCategoryCost(cat: Category) :number {
    const catEvents = this.events.filter(e=>e.category === cat.id && e.type === 'outcome');
    return catEvents.reduce((total, e)=>{
      total += e.amount;
      return total;
    }, 0);
  }

  private getPercent(cat: Category):number {
    const percent = (100 * this.getCategoryCost(cat))/cat.capacity;
    return percent > 100 ? 100 : percent; 
  }

  getCatPercent(cat: Category) : string {
    return this.getPercent(cat) + '%';

  }
  getCatColorClass(cat: Category):string {
    const percent = this.getPercent(cat);
    const  className =percent < 60 ? 'success' : percent>=100 ? 'danger' : 'warning';
    return className;


  }

}
