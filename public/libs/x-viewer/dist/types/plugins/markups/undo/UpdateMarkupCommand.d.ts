import { Command } from "../../../core/undo/Command";
import { MarkupData } from "../BaseMarkup";
import { type MarkupPlugin } from "../MarkupPlugin";
export declare class UpdateMarkupCommand extends Command {
    private manager;
    private oldData;
    private newData;
    constructor(manager: MarkupPlugin, oldData: MarkupData, newData: MarkupData);
    undo(): boolean;
    redo(): boolean;
}
