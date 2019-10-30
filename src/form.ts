import {Model} from 'mdel'

interface rule{
  type:'',
  message:''
}
interface field{
  defaultValue:'',
  rules:[],
  transform:{
    (data:any):any
  }
}

interface IData {
  loading: boolean
}

export default class FormModel<T, K extends keyof T> extends Model<IData> {
  constructor(){
    super({
      loading:false
    });
  }

  setLoading(status) {
    this.setData({
      loading: status
    })
  }

  setFields(fields: T) {
    //this.fields = fields;
    //设置字段值
    Object.keys(fields).forEach((key) => this.generateField(key));
    //this.form.setFieldsValue(fields);
    this.setLoading(false);
  }

  updateFields(fields: Partial<T>) {
    //设置字段值
    //Object.keys(fields).forEach((key) => this.generateField(key));
    //this.form.setFieldsValue(fields)
  }

  validateFields(successCb: (formData: T,originValues:T) => void) {

  }
}
