import { Model } from 'mdel';
export interface IModalData {
    visible: boolean;
    payload: {
        [index: string]: any;
    };
}
export declare class ModalModel extends Model<IModalData> {
    static show(component: any, payload?: {}): void;
    static hide(component: any): void;
    static getIsShow(store: Model): boolean;
    static getIsVisibleChange(store: Model): boolean;
    constructor();
}
