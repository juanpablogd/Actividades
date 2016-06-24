import {Component, Input} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';
import {ControlGroup, FormBuilder, Validators, NgClass, Control} from '@angular/common';
import {Actividad} from '../../models/actividad';
import {AppValidators} from '../../validators';
import {ControlGroupHelper} from '../ControlGroupHelper';
import {FieldErrors} from '../../pipes/FieldErrors';


@Component({
  selector: 'actividad-form',
  moduleId: module.id,
  styleUrls: ['./actividad-form.css'],
  templateUrl: './actividad-form.html',
  pipes: [FieldErrors],
  directives: [NgClass]
})
export class ActividadFormComponent {

  actividad: Actividad = new Actividad();
  actividadForm: ControlGroup;

  constructor(protected http: Http, protected router: Router, builder:FormBuilder) {
    this.actividadForm = builder.group({
      first_name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      last_name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      email: ['', Validators.compose([Validators.required, AppValidators.email])],
      password: ['', Validators.compose([Validators.minLength(6)])]
    });
  }


  /**
   * Handle errors
   * @param response
   */
  handleError(response: Response) {
    if (response.status === 422) {
      let errors : Object = response.json();
      console.log(errors);
      for (var field in errors) {
        var fieldErrors: string[] = (<any>errors)[field];
        ControlGroupHelper.setControlErrors(this.actividadForm, field, fieldErrors);
      }
    }

    console.log(response);
  }

  @Input()
  set model (actividad: Actividad) {
    if (actividad) {
      this.actividad = actividad;
      ControlGroupHelper.updateControls(this.actividadForm, this.actividad);
      console.log( (<Control>this.actividadForm.controls['first_name']).errors);
    }
  }

  onSubmit() {
    console.log(this.actividadForm);
    if (!this.actividadForm.valid) {
      return ;
    }

    this.actividad.attributes = this.actividadForm.value;

    console.log(this.actividad);

    if (this.actividad.id) {
      this.http.put('/actividads/' + this.actividad.id, JSON.stringify({actividad: this.actividad}))
        .map(res => res.json())
        .subscribe(
          (data) => {
            this.router.navigate(['ActividadList']);
          },
          (response: Response) => {
            this.handleError(response);
          }
        );
    } else {
      this.http.post('/actividads', JSON.stringify({actividad: this.actividad}))
        .map(res => res.json())
        .subscribe(
          (data) => {
            this.actividad.id = data.id;
            this.router.navigate(['ActividadList']);
          },
          (response: Response) => {
            this.handleError(response);
          }
        );
    }
  }

}