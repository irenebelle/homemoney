import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { Bill } from "../models/bill.model";
import { map } from 'rxjs/operators';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {
    constructor(public http:Http) {
        super(http);
    }

  
    getBill():Observable<Bill> {
        return this.get('bill');

    }


    updateBill(bill: Bill):Observable<Bill> {
        return this.put('bill', bill);
    }

    getCurrency(base:string = 'UAH'):Observable<any>{
        return this.http.get(`http://data.fixer.io/api/latest?access_key=811bfbb2e0c7b00d5d41b61f4e4fb3a3`)
        .pipe(map((response: Response) => response.json()));

    }

}