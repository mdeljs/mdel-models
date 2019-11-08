import { Model } from 'mdel';
export interface IItemData {
    [index: string]: any;
}
export declare class ItemModel<T extends IItemData> extends Model<T> {
    constructor(data: T);
    setData(data: Partial<T>): void;
}
