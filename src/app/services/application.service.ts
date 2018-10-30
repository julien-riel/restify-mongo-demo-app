import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '../model/application';
import { LazyLoadEvent } from 'primeng/primeng';




@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

    constructor(private http: HttpClient) { }


    loadCarsLazy(event: LazyLoadEvent) {
      console.log('Event')
      let queryString = `?offset=${event.first}&limit=${event.rows}`;
      if (event.sortField) {
        queryString = queryString + `&sort=${event.sortOrder === 1 ? '' : '-'}${event.sortField}`;
»
      }
      return this.http.get<any>(`http://localhost:3000/applications/${queryString}`)
      .toPromise()
      .then(res => <Application[]>res.items)
      .then(data => { return data; });
  }

    getCarsSmall() {
    return this.http.get<any>('http://localhost:3000/applications/')
      .toPromise()
      .then(res => <Application[]>res.items)
      .then(data => { return data; });
    }

    getCarsMedium() {
    return this.http.get<any>('assets/showcase/data/cars-medium.json')
      .toPromise()
      .then(res => <Application[]>res.data)
      .then(data => { return data; });
    }

    getCarsLarge() {
    return this.http.get<any>('assets/showcase/data/cars-large.json')
      .toPromise()
      .then(res => <Application[]>res.data)
      .then(data => { return data; });
    }

  getCarsHuge() {
    return this.http.get<any>('assets/showcase/data/cars-huge.json')
      .toPromise()
      .then(res => <Application[]>res.data)
      .then(data => { return data; });
  }
}