import { Model } from 'mdel';
export interface HistoryQuery {
    [index: string]: string;
}
export interface HistoryData {
    pathname: string;
    search: string;
    query: HistoryQuery;
}
export declare class HistoryModel extends Model<HistoryData> {
    static getIsSearchChange(store: Model<any>): boolean;
    history: any;
    constructor(history: any);
    setQuery(query: HistoryQuery): void;
    setUrl(url: string): void;
    goBack(): void;
}
