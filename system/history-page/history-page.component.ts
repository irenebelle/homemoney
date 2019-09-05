import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/category.service';
import { EventsService } from '../shared/services/events.service';
import { combineLatest } from 'rxjs';
import { Category } from '../shared/models/category.model';
import { IREvent } from '../shared/models/event.model';
import * as moment from 'moment';


@Component({
  selector: 'ir-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {

  constructor(private categoriesService: CategoriesService,
              private eventService: EventsService) { 

  }

  categories: Category [] = [];
  events: IREvent[] = [];
  isLoaded = false;
  charData = [];
  isFilterVisible = false;
  filteredEvents: IREvent[] = [];

  ngOnInit() {
  const subscription =   combineLatest(
      this.categoriesService.getCategories(),
      this.eventService.getEvent());
      subscription.subscribe((data:[Category[], IREvent[]]) => {
        this.categories= data[0];
        this.events = data[1];
        this.setOriginalEvents();
        this.calculateChartData();
        this.isLoaded=true;
      });
  }

  calculateChartData():void {
    this.charData = [];
    this.categories.forEach((cat) => {
      const catEvents = this.filteredEvents.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.charData.push({
        name: cat.name,
        value: catEvents.reduce((total, e) => {
          total = total+  e.amount;
          return total;
        }, 0)
      });

    });

  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  private setOriginalEvents() {
    this.filteredEvents =this.events.slice();
  }

  openFilter() {
    this.toggleFilterVisibility(true);

  }

  onFilterApply(filterData) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents.filter((e)=> {
      return filterData.types.indexOf(e.type) !== -1;
    }).filter((e)=> {
      return filterData.categories.indexOf(e.category.toString()) !== -1;
    }).filter((e) => {
      const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
      return momentDate.isBetween(startPeriod, endPeriod);
    });
    this.calculateChartData();


  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();

  }

}
