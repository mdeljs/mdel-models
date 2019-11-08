import {Model} from 'mdel'

export interface IItemData {
  [index: string]: any
}

export class ItemModel<T extends IItemData> extends Model<T> {
  constructor(data: T) {
    super(data);
  }

  setData(data: Partial<T>) {
    super.setData(data)
  }
}
