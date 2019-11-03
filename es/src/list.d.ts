import { Model } from "mdel";
interface ICounts {
    currentPage: number;
    pageSize: number;
    totalNum: number;
    [index: string]: any;
}
interface IData {
    loading: boolean;
    counts: ICounts;
    items: any[];
    selected: any[];
    expanded: any[];
}
export default class ListModel extends Model<IData> {
    itemKey: any;
    constructor(itemKey?: string);
    setLoading(status: boolean): void;
    setItems(items: any, counts?: ICounts): void;
    deleteItems(keys: any[]): void;
    updateItems(keys: any, data: any): void;
    setSelected: (keys: any[]) => void;
    setExpanded(keys: any[]): void;
}
export {};
