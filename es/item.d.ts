import { Model } from 'mdel';
export interface ItemData {
    [index: string]: any;
}
export declare class ItemModel<T extends ItemData> extends Model<T> {
    constructor(data: T);
    setData(data: Partial<T>): void;
}
