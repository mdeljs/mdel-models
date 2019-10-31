import {Model} from 'mdel'

interface IData {
  loading: boolean,
}

export default class FormModel<T, K extends keyof T> extends Model<IData> {
  fields = {};

  constructor() {
    super({
      loading: false
    });
  }

  setLoading(status) {
    this.setData({
      loading: status
    })
  }

  setFieldsValues(fields: T) {
  }

  updateFieldsValue(fields: Partial<T>) {

  }

  validateFields() {

  }
}
