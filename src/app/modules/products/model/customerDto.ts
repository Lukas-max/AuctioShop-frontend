export class CustomerDto {

  private firstName: string;
  private lastName: string;
  private telephone: number;
  private email: string;
  private country: string;
  private street: string;
  private houseNumber: number;
  private apartmentNumber: number;
  private postalCode: string;
  private city: string;

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
}
