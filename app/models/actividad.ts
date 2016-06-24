import {Model} from './model';

export class Actividad extends Model {
  id:number;
  descripcion:string;

  attributeNames: string[] = ['id', 'descripcion'];

}