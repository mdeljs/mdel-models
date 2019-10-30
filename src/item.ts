import {Model} from 'mdel'


export default class ItemModel<T extends object> extends Model<T> {
  constructor(data: T) {
    super(data);
  }

  updateData(data: Partial<T>) {
    this.setData(data)
  }
}
