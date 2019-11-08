import { Model } from 'mdel';
export interface IHistoryQuery {
    [index: string]: string | number;
}
export interface IHistoryData {
    pathname: string;
    search: string;
    query: IHistoryQuery;
}
export declare class HistoryModel extends Model<IHistoryData> {
    static getIsSearchChange(store: Model<any>): boolean;
    history: any;
    constructor(history: any);
    setQuery(query: IHistoryQuery): void;
    setUrl(url: string): void;
    goBack(): void;
}
