export class Fees {
  id: number;
  description: string;
  permitType: number;

  constructor(id, description, permitType){
    this.id=id;
    this.description = description;
    this.permitType = permitType;
  }
}
