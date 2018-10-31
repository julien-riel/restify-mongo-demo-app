import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {
  formData: import("/Users/URIELJU/Documents/source/demo-permis-web/src/app/model/application").Application[];

  constructor(private carService: ApplicationService) { }

  public jsonSchema: any = {
    '$id': 'https://example.com/person.schema.json',
    '$schema': 'http://json-schema.org/draft-07/schema#',
    'title': 'Person',
    'type': 'object',
    'required': ['status', 'firstName', 'lastName', 'citizenId', 'assetId'],
    'properties': {
      'status': {
        'type': 'string',
        'description': 'Le statut de la demande'
      },
      'firstName': { 'type': 'string' },
      'lastName': { 'type': 'string' },
      'description': { 'type': 'string' },
      'plannedDate': { 'type': 'string', 'format': 'date-time' },
      'approbation': {
        'type': 'object',
        'properties': {
          'isApproved': { 'type': 'boolean' },
          'approvedBy': { 'type': 'string' },
          'approvedOn': { 'type': 'string' }
        }
      },
      'citizenId': {
        'type': 'string',
        'description': 'L\'id du citoyen qui fait la demande'
      },
      'assetId': {
        'description': 'Un numéro d\'actif. Doit être un nombre entier positif',
        'type': 'integer',
        'minimum': 0
      }
    }
};

  ngOnInit() {
    let id="";
    this.carService.getById(id).then((cars) => {
      console.log('Ok....', cars);
      this.formData = cars;
  });
  }
}
