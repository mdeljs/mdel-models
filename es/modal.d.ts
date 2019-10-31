import { Model } from 'mdel';
interface IData {
    visible: boolean;
    payload: {
        [index: string]: any;
    };
}
export default class ModalModel extends Model<IData> {
    static show(component: any, payload?: {}): void;
    static hide(component: any): void;
    static getIsShow(store: Model): boolean;
    constructor();
}
export {};
