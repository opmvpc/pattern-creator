export class Cell {
  public value: boolean;

  constructor(value: boolean = false) {
    this.value = value;
  }

  public getValue(): boolean {
    return this.value;
  }

  public setValue(value: boolean): void {
    this.value = value;
  }

  public invert(): void {
    this.value = !this.value;
  }
}
