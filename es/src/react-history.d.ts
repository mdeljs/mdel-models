import { Model } from 'mdel';
interface IQuery {
    [index: string]: string;
}
interface IData {
    pathname: string;
    search: string;
    query: IQuery;
}
export default class HistoryModel extends Model<IData> {
    static getIsSearchChange(store: Model<any>): boolean;
    history: any;
    constructor(history: any);
    setQuery(query: IQuery): void;
    setUrl(url: string): void;
    goBack(): void;
    private updateData;
}
export {};
