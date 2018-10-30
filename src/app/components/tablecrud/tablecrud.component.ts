import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/model/application';
import { ApplicationService } from 'src/app/services/application.service';
import { LazyLoadEvent } from 'primeng/primeng';

@Component({
    selector: 'app-tablecrud',
    templateUrl: './tablecrud.component.html',
    styleUrls: ['./tablecrud.component.css']
  })
export class TablecrudComponent implements OnInit {

    displayDialog: boolean;

    application: Application = {};

    selectedCar: Application;

    newCar: boolean;

    cars: Application[];

    cols: any[];

    constructor(private carService: ApplicationService) { }

    ngOnInit() {
        

        this.cols = [
            { field: 'id', header: 'id' },
            { field: 'plannedDate', header: 'plannedDate' },
            { field: 'firstName', header: 'firstName' },
            { field: 'lastName', header: 'lastName' },
        ];
    }

    // [totalRecords]="totalRecords"

    loadCarsLazy(event: LazyLoadEvent) {
        
        this.carService.loadCarsLazy(event).then((cars) => {
            this.cars = cars.map<Application>(
                x => {
                    return {
                        id: x.id,
                        firstName: x.firstName,
                        lastName: x.lastName,
                        plannedDate: x.plannedDate,
                        audit: {
                            createdBy: '234567890!!!'
                        }
                    };
                }
            );
            this.cars = cars;
        });


        // this.carService.loadCarsLazy(event);
    }

    showDialogToAdd() {
        this.newCar = true;
        this.application = {};
        this.displayDialog = true;
    }

    save() {
        let cars = [...this.cars];
        if (this.newCar)
            cars.push(this.application);
        else
            cars[this.cars.indexOf(this.selectedCar)] = this.application;

        this.cars = cars;
        this.application = null;
        this.displayDialog = false;
    }

    delete() {
        const index = this.cars.indexOf(this.selectedCar);
        this.cars = this.cars.filter((val, i) => i != index);
        this.application = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newCar = false;
        this.application = this.cloneCar(event.data);
        this.displayDialog = true;
    }

    cloneCar(c: Application): Application {
        let car = {};
        for (let prop in c) {
            car[prop] = c[prop];
        }
        return car;
    }
}