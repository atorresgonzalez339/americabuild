export class PermitUserProfile {
  id:number;
  name: string;
  firstname:string;
  lastname:string;
  address1 : string;
  address2 : string;
  city : string;
  state : string;
  zip : string;
  phoneNumber : string;
  driverLicOrId : string;  


  constructor(id, name, lastname, firstname, address1, address2 ,city ,state ,zip ,phoneNumber, driverLicOrId){
    this.id=id;
    this.name=name;
    this.firstname=firstname;
    this.lastname=lastname;
    this.address1=address1;
    this.address2=address2
    this.city=city;
    this.state=state;
    this.zip=zip;
    this.phoneNumber=phoneNumber;
    this.driverLicOrId=driverLicOrId;
  }
}
