import { Cell } from "@/domain/models/Cell";
import type { Code } from "@/domain/types/Code";
import type { Size } from "@/domain/types/Size";

export class Board {
  public cells: Cell[];
  public code: Code;

  constructor(size: number) {
    this.cells = [];
    for (let i = 0; i < size * size; i++) {
      this.cells[i] = new Cell();
    }
    this.code = this.getCode();
  }

  public toggleCell(index: number): void {
    this.cells[index].invert();
    this.code = this.getCode();
  }

  public getCode(): Code {
    const size = Math.sqrt(this.cells.length);
    let cells = [];
    for (let index = 0; index < size; index++) {
      cells.push(this.cells.slice(index * size, (index + 1) * size));
    }
    cells = cells.map((row) => row.map((cell) => (cell.getValue() ? 1 : 0)));

    return {
      body: (JSON.stringify(cells) as any)
        .replaceAll("],", "],\n\t")
        .replace(/^\[/, "[\n\t")
        .replace(/\]$/, "\n]"),
    };
  }

  public getCellsJSON(): string {
    return JSON.stringify(this.cells.map((cell) => cell.getValue()));
  }

  public invert(): void {
    this.cells.map((cell) => cell.invert());
    this.code = this.getCode();
  }

  public clear(): void {
    this.cells = new Board(this.size).cells;
    this.code = this.getCode();
  }

  public load(cells: boolean[] | null): this {
    if (cells === null) {
      return this;
    }
    this.cells = cells.map((value: boolean) => new Cell(value));
    this.code = this.getCode();
    return this;
  }

  public get size(): number {
    return Math.sqrt(this.cells.length);
  }

  public updateSize(size: Size): void {
    if (size.width !== this.size) {
      this.cells = new Board(size.width).cells;
      this.code = this.getCode();
    }
  }

  public fromCode(code: string): void {
    let cells = null;
    try {
      cells = JSON.parse(code) as any;
    } catch (error) {
      throw new Error("Can't parse code");
    }

    if (this.isCellsCodeCorrect(cells)) {
      this.cells = cells
        .flat()
        .map((value: number) => new Cell(Boolean(value)));
    }
  }

  public isCellsCodeCorrect(cells: any): boolean {
    if (!Array.isArray(cells)) {
      throw new Error("Code needs to be an array");
    }
    if (cells.length !== this.size) {
      throw new Error("Wrong number of rows");
    }
    for (const row of cells) {
      if (row.length !== this.size) {
        throw new Error("Wrong number of columns");
      }
      for (const cell of row) {
        if (cell !== 0 && cell !== 1) {
          throw new Error("Cells values should be 0 or 1");
        }
      }
    }
    return true;
  }
}
