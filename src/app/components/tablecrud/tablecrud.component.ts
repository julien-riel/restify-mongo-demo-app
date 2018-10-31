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

    statuses: any[];
    cols: any[];

    yearTimeout: any;

    constructor(private carService: ApplicationService) { }

    ngOnInit() {
        this.statuses = [
            { label: '', value: null },
            { label: 'Soumise', value: 'submitted' },
            { label: 'En Analyse', value: 'process' },
            { label: 'Approuvé', value: 'approuved' },
            { label: 'Fermé', value: 'closed' }
        ];

        this.cols = [
            { field: 'id', header: 'id' },
            { field: 'plannedDate', header: 'plannedDate' },
            { field: 'firstName', header: 'firstName' },
            { field: 'assetId', header: 'assetId' },
            { field: 'status', header: 'Status' },
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
                        assetId: x.assetId,
                        status: x.status,
                        audit: {
                            createdBy: '234567890!!!'
                        }
                    };
                }
            );
            this.cars = cars;
        });
    }


    jsonSchema = {
        "$id": "https://example.com/person.schema.json",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Person",
        "type": "object",
        "required": ["status", "firstName", "lastName", "citizenId", "assetId"],
        "properties": {
          "status": {
            "type": "string",
            "description": "Le statut de la demande"
          },
          "firstName": { "type": "string" },
          "lastName": { "type": "string" },
          "description": { "type": "string" },
          "plannedDate": { "type": "string", "format": "date-time" },
          "approbation": {
            "type": "object",
            "properties": {
              "isApproved": { "type": "boolean" },
              "approvedBy": { "type": "string" },
              "approvedOn": { "type": "string" }
            }
          },
          "citizenId": {
            "type": "string",
            "description": "L'id du citoyen qui fait la demande"
          },
          "assetId": {
            "description": "Un numéro d'actif. Doit être un nombre entier positif",
            "type": "integer",
            "minimum": 0
          }
        }
      };

    onAssetIdChange(event, dt) {
        if (this.yearTimeout) {
            clearTimeout(this.yearTimeout);
        }

        this.yearTimeout = setTimeout(() => {
            dt.filter(event.value, 'assetId', 'gt');
        }, 250);
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