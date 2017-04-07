import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { User } from "./user";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  private url = "http://ebola.agency/frontend-task.php?page=1&per_page=";

  constructor(private http: Http) { }

  public getUsers(): Observable<User[]> {
   return this.http.get(this.url)
    .map(res=>res.json().count)
    .flatMap(count=>this.http.get(`${this.url}${count}`).map(this.extractProducts)
    .catch(this.handleError));
  }

  private extractProducts(response: Response) {
    let res = response.json().data;
    let products: User[] = [];
    for (let i = 0; i < res.length; i++) {
      products.push(new User(res[i].id, res[i].first_name, res[i].last_name, res[i].patronymic_name, res[i].discount));
    }
    return products;
  }

  private handleError(error: any, cought: Observable<any>): any {
    let message = "";

    if (error instanceof Response) {
      let errorData = error.json().error || JSON.stringify(error.json());
      message = `${error.status} - ${error.statusText || ''} ${errorData}`
    } else {
      message = error.message ? error.message : error.toString();
    }

    console.error(message);

    return Observable.throw(message);
  }
}

