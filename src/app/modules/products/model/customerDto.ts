export class CustomerDto {

  public firstName: string;
  public lastName: string;
  public telephone: number;
  public email: string;
  public country: string;
  public street: string;
  public houseNumber: number;
  public apartmentNumber: number;
  public postalCode: string;
  public city: string;

  constructor() {
  }

  public setFirstName(firstName: string){
    this.firstName = firstName;
  }

  public setLastName(lastName: string){
    this.lastName = lastName;
  }

  public setTelephone(telephone: number){
    this.telephone = telephone;
  }

  public setEmail(email: string){
    this.email = email;
  }

  public setCountry(country: string){
    this.country = country;
  }

  public setStreet(street: string){
    this.street = street;
  }

  public setHouseNumber(houseNumber: number){
    this.houseNumber = houseNumber;
  }

  public setApartmentNumber(apartmentNumber: number){
    this.apartmentNumber = apartmentNumber;
  }

  public setPostalCode(postalCode: string){
    this.postalCode = postalCode;
  }

  public setCity(city: string){
    this.city = city;
  }

  public getFirstName(){
    return this.firstName;
  }
}
