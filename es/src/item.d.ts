import { Model } from 'mdel';
export default class ItemModel<T extends object> extends Model<T> {
    constructor(data: T);
    setData(data: Partial<T>): void;
}
