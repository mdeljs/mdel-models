import { Model } from 'mdel';
interface IData {
    loading: boolean;
}
export default class FormModel<T, K extends keyof T> extends Model<IData> {
    constructor();
    setLoading(status: any): void;
    setFields(fields: T): void;
    updateFields(fields: Partial<T>): void;
    validateFields(successCb: (formData: T, originValues: T) => void): void;
}
export {};
