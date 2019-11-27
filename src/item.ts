import {Model} from 'mdel'

export interface ItemData {
  [index: string]: any
}

export class ItemModel<T extends ItemData> extends Model<T> {
  constructor(data: T) {
    super(data);
  }

  setData(data: Partial<T>) {
    super.setData(data)
  }
}
