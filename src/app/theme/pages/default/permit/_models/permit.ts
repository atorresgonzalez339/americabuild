export class Permit {
  id:number;
  createdAt: string;
  updatedAt : string;

  constructor(id, createdAt, updatedAt){
    this.id=id;
    this.createdAt=createdAt;
    this.updatedAt= updatedAt;
  }
}
