export class PermitType {
  id:number;
  name: string;
  description : string;
  type : string;


  constructor(id, name, description, type){
    this.id=id;
    this.name=name;
    this.description= description;
    this.type= type;
  }
}
