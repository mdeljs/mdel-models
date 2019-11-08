import { Model } from "mdel";
interface IListCounts {
    pageNo: number;
    pageSize: number;
    totalNum: number;
    [index: string]: any;
}
interface IListData {
    loading: boolean;
    counts: IListCounts;
    items: any[];
    selected: any[];
    expanded: any[];
}
export declare class ListModel extends Model<IListData> {
    itemKey: any;
    constructor(itemKey?: string);
    setLoading(status: boolean): void;
    setItems(items: any, counts?: IListCounts): void;
    deleteItems(keys: any[]): void;
    updateItems(keys: any, data: any): void;
    setSelected: (keys: any[]) => void;
    setExpanded: (keys: any[]) => void;
}
export {};
