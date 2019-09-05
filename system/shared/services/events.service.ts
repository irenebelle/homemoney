import { BaseApi } from '../../../shared/core/base-api';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { IREvent } from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {
    constructor(public http: Http) {
        super(http);
    }

    addEvent(event: IREvent): Observable<IREvent> {
        return this.post('events', event);
    }

    getEvent():Observable<IREvent[]> {
        return this.get('events');
    }

    getEventById(id: string): Observable<IREvent>{
        return this.get(`events/${id}`);

    }

}