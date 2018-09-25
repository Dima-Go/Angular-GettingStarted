
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ITransaction } from "./ITransaction";




@Injectable()
export class TransactiosService {
    private _transactionsUrl = './api/transactions/transactions.json';

    constructor(private _http: HttpClient) {}

    getHttpTransactions(): Observable<ITransaction[]>{
        return this._http.get<ITransaction[]>(this._transactionsUrl)
                //    .do(data => console.log('All: ' + JSON.stringify(data)))
                   .catch(this.handleError);
    }

    getTransaction(reference: number): Observable<ITransaction> {
        return this.getHttpTransactions()
            .map((transactions: ITransaction[]) => transactions.find(p => p.reference === reference));
    }

    handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return observableThrowError(err.message);
    }
}