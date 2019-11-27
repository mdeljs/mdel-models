import { Model } from "mdel";
export interface ListCounts {
    pageNo: number;
    pageSize: number;
    totalNum: number;
    [index: string]: any;
}
export interface ListData {
    loading: boolean;
    counts: ListCounts;
    items: any[];
    selected: any[];
    expanded: any[];
}
export declare class ListModel extends Model<ListData> {
    itemKey: any;
    constructor(itemKey?: string);
    setLoading(status: boolean): void;
    setItems(items: any, counts?: ListCounts): void;
    deleteItems(keys: any[]): void;
    updateItems(keys: any, data: any): void;
    setSelected: (keys: any[]) => void;
    setExpanded: (keys: any[]) => void;
}
