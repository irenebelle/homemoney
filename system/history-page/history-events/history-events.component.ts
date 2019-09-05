import { Component, OnInit, Input } from '@angular/core';
import { IREvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'ir-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: IREvent[] = [];
  searchValue = '';
  searchPlaceholder = 'Сумма';
  searchField = 'amount';

  constructor() { }

  ngOnInit() {
    this.events.forEach((e) => {
      e.catName = this.categories.find(c=> c.id === e.category).name;
    });
  }

  getEventClass(e: IREvent) {
    if(e.type === 'outcome') {
      return "label label-danger";
    } else {
      return "label label-success";
    }
  }

  changeCriteria(field: string) {
    const namesMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'тип'
    }
    this.searchPlaceholder= namesMap[field];
    this.searchField=field;

  }

}
