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
    history: any;
    constructor(history: any);
    changeQuery(query: IQuery): void;
    changeUrl(url: string): void;
    goBack(): void;
    private updateData;
}
export {};
