export class Storage {
  public static namespace: string = "pattern-creator";
  public static addBoard(name: string, board: string): void {
    const boards = Storage.getBoardsFromStorage();
    if (boards === null) {
      localStorage.setItem(this.namespace, JSON.stringify({}));
    }
    boards[name] = board;
    localStorage.setItem(this.namespace, JSON.stringify(boards));
  }

  public static getBoard(name: string): boolean[] | null {
    const boards = Storage.getBoardsFromStorage();
    const cellsJSON = boards[name];
    if (cellsJSON) {
      return JSON.parse(cellsJSON);
    }
    return null;
  }

  private static getBoardsFromStorage() {
    const boards = JSON.parse(localStorage.getItem(this.namespace) || "{}");
    return boards;
  }

  public static getBoardNames(): string[] {
    const names: string[] = [];
    const boards = Storage.getBoardsFromStorage();

    for (const key in boards) {
      if (Object.prototype.hasOwnProperty.call(boards, key)) {
        names.push(key);
      }
    }
    return names.sort();
  }
}
