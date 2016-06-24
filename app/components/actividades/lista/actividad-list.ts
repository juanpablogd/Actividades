import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Http} from '@angular/http';
import {Actividad} from '../../../models/actividad';

@Component({
  selector: 'actividad-list',
  templateUrl: './actividad-list.html',
  //styleUrls: ['./app.css'],
  moduleId: module.id,

  directives: [ROUTER_DIRECTIVES]
})
export class ActividadList implements OnInit {

  actividades: Actividad[] = [];

  constructor(private http: Http) {}

  ngOnInit() {
    this.http.get('/actividades')
      .map(res => res.json())
      .subscribe(
        (actividades) => {
          actividades.forEach( (actividadData: Object) => {
            var actividad: Actividad = new Actividad(actividadData);
            this.actividades.push(actividad);
          });
          //console.log(this.actividades);
        }
      );
  }

  deleteModel(actividad: Actividad) {
    if (confirm('Seguro que desea eliminar la actividad ' + actividad.descripcion)) {
      this.http.delete('/actividades/' + actividad.id)
        .subscribe(
          (response) => {
            if (response.status === 204) {
              this.actividades.forEach((u: Actividad, i: number) => {
                if (u.id === actividad.id) {
                  this.actividades.splice(i, 1);
                }
              });
              console.log(this.actividades);
            }
          }
        );
    }
  }


}