export class Company {
  id: number;
  companyName: string;
  subdomain: string;

  constructor(id, companyName, subdomain){
    this.id=id;
    this.companyName = companyName;
    this.subdomain = subdomain;
  }
}
