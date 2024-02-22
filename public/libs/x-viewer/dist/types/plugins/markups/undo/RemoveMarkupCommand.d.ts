import { Command } from "../../../core/undo/Command";
import { MarkupData } from "../BaseMarkup";
import { type MarkupPlugin } from "../MarkupPlugin";
export declare class RemoveMarkupCommand extends Command {
    private manager;
    private data;
    constructor(manager: MarkupPlugin, data: MarkupData);
    undo(): boolean;
    redo(): boolean;
}
