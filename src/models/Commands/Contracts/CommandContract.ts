export interface CommandContract {
  undoable: boolean;
  execute(): void;
}
