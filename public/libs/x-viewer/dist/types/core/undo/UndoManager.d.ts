import { Command } from "./Command";
type CommandData = Command | Command[];
/**
 * Undo/redo manager.
 */
export declare class UndoManager {
    private history;
    private step;
    private maxCount;
    private isBatchCommand;
    private batchCommands;
    constructor(maxCount?: number);
    addCommand(command: Command): void;
    startTransaction(): void;
    endTransaction(): void;
    undo(): boolean;
    redo(): boolean;
    getCommands(): CommandData[];
    canUndo(): boolean;
    canRedo(): boolean;
    clear(): void;
    destroy(): void;
}
export {};
