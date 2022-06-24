export class Storage {
  public static addBoard(name: string, board: string): void {
    localStorage.setItem(name, board);
  }

  public static getBoard(name: string): boolean[] | null {
    const cellsJSON = localStorage.getItem(name);
    if (cellsJSON) {
      return JSON.parse(cellsJSON);
    }
    return null;
  }

  public static getBoardNames(): string[] {
    const names: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      names.push(localStorage.key(i) ?? "Unnamed");
    }
    return names.sort();
  }
}
