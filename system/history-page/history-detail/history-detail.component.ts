import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventsService } from '../../shared/services/events.service';
import { CategoriesService } from '../../shared/services/category.service';
import { IREvent } from '../../shared/models/event.model';
import {mergeMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Category } from '../../shared/models/category.model';



@Component({
  selector: 'ir-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit {

  event: IREvent;
  category: Category;
  isLoaded = false;

  constructor(private route:ActivatedRoute,
    private eventsService: EventsService,
    private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.route.params
    .pipe(mergeMap((params: Params) => this.eventsService.getEventById(params['id']))
      ).pipe(mergeMap((event: IREvent)=>{
        this.event = event;
        return this.categoriesService.getCategoryById(event.category);
      })).subscribe((category: Category)=> {
    
      this.category = category;
      this.isLoaded = true;
          
      });
      
      
    
  }

  changeClass(type: string) {
    if(type === 'income') {
      return "card card-success";
    } else {
      return "card card-danger";

    }
  }

}
