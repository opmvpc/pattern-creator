import { Cell } from "@/models/Cell";

export class Board {
  public cells: Cell[];

  constructor(size: number) {
    this.cells = [];
    for (let i = 0; i < size * size; i++) {
      this.cells[i] = new Cell();
    }
  }

  public toggleCell(index: number): void {
    this.cells[index].invert();
  }

  public getCellsJSON(): string {
    const size = Math.sqrt(this.cells.length);
    let cells = [];
    for (let index = 0; index < size; index++) {
      cells.push(this.cells.slice(index * size, (index + 1) * size));
    }
    cells = cells.map((row) => row.map((cell) => (cell.getValue() ? 1 : 0)));

    return JSON.stringify(cells);
  }

  public invert(): void {
    this.cells.map((cell) => cell.invert());
  }
}
