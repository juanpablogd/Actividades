import {Component} from '@angular/core';
import * as io from "socket.io-client";
import {Actividad} from '../models/actividad';

@Component({
  selector: 'my-app',
  template: ''+
            '<div class="table-responsive">'+
              '<table class="table table-striped table-hover "><thead><tr>'+
                  '<th>Actividad</th>'+
                '</tr></thead>'+
                '<tbody *ngFor="let act of Actividades">'+
                  '<td class="text-info">{{act.descripcion}}</td>'+
                  '<td><span class="glyphicon glyphicon-edit"></span></td>'+
                '</tbody></table>'+
            '</div>'
})

export class AppComponent {
    socket:SocketIOClient.Socket;
    Actividades:Actividad;
    constructor(){
        this.socket = io('http://172.20.5.127:3322/webActividad');
        this.socket.on('actividades', function(data:Actividad){
            console.log(data);
            this.Actividades = data;
        }.bind(this));    
    }
    title = 'Seguimiento Actividades';
}
