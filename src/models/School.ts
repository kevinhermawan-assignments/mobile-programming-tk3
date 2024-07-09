export default class School {
  private id: number;
  private name: string;
  private address: string;
  private isEligible: boolean;

  constructor(id: number, name: string, address: string, isEligible: boolean) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.isEligible = isEligible;
  }

  getId() {
    return this.id.toString();
  }

  getName() {
    return this.name;
  }

  getAddress() {
    return this.address;
  }

  getIsEligible() {
    return this.isEligible;
  }
}
