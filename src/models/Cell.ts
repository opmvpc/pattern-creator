export class Cell {
  public value: boolean;

  constructor() {
    this.value = false;
  }

  public getValue(): boolean {
    return this.value;
  }

  public setValue(value: boolean) {
    this.value = value;
  }
}
