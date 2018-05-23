export class CompanyFees {
    id: number;
    company: number;
    feesCategory: number;
    value: number;

    constructor(id, company, feesCategory, value) {
        this.id = id;
        this.company = company;
        this.feesCategory = feesCategory;
        this.value = value;
    }
}