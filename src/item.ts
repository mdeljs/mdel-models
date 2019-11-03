import {Model} from 'mdel'


export default class ItemModel<T extends object> extends Model<T> {
  constructor(data: T) {
    super(data);
  }

  setData(data: Partial<T>) {
    super.setData(data)
  }
}
