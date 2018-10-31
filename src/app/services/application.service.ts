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
      console.log('Event', event);
      let queryString = `?offset=${event.first}&limit=${event.rows}`;

      for (const filter of Object.keys(event.filters)) {

        if (filter === 'global') {
          queryString = queryString + `&q=${event.filters[filter].value}`;
        } else if (filter === 'assetId') {
          queryString = queryString + `&fromAssetId=${event.filters[filter].value}`;
        } else {
          if (Array.isArray(event.filters[filter].value)) {
            event.filters[filter].value.forEach( (item) => {
              queryString = queryString + `&${filter}=${item}`;
            });
          } else {
            queryString = queryString + `&${filter}=${event.filters[filter].value}`;
          }
        }
      }


      if (event.sortField) {
        queryString = queryString + `&sort=${event.sortOrder === 1 ? '' : '-'}${event.sortField}`;
      }

      return this.http.get<any>(`http://localhost:3000/applications/${queryString}`)
      .toPromise()
      .then(res => <Application[]>res.items)
      .then(data => { return data; });
  }

  getById(id: string) {
    let id2 = "5bd90f305cd7087440386a67"; 
    return this.http.get<any>(`http://localhost:3000/applications/${id2}`)
      .toPromise()
      .then(res => res);
      // .then(data => { return data; });
  }
}