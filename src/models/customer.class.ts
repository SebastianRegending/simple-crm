export class Customer {
    firstName: string;
    lastName: string;
    street: string;
    houseNumber: string;
    zipCode: number;
    city: string;
    email: string;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.street = obj ? obj.street : '';
        this.houseNumber = obj ? obj.houseNumber : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.email = obj ? obj.email : '';
       
    }

    toJSON() {
        return {
          firstName: this.firstName,
          lastName: this.lastName,
          street: this.street,
          houseNumber: this.houseNumber,
          zipCode: this.zipCode,
          city: this.city,
          email: this.email
        };
      }
}