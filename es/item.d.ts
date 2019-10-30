import { Model } from 'mdel';
export default class ItemModel<T extends object> extends Model<T> {
    constructor(data: T);
    updateData(data: Partial<T>): void;
}
