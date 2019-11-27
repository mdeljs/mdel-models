import { Model } from 'mdel';
export interface ModalData {
    visible: boolean;
    payload: {
        [index: string]: any;
    };
}
export declare class ModalModel extends Model<ModalData> {
    static show(component: any, payload?: {}): void;
    static hide(component: any): void;
    static getIsVisibleChange(store: Model): boolean;
    constructor();
}
