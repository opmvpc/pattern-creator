import type { CommandContract } from "./Contracts/CommandContract";

export abstract class AbstractCommand implements CommandContract {
  public undoable: boolean = false;

  abstract execute(): void;
}
