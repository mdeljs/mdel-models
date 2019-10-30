interface IQuery {
    [index: string]: string;
}
interface IData {
    pathname: string;
    search: string;
    query: IQuery;
}
declare const _default: {
    history: any;
    changeQuery(query: IQuery): void;
    changeUrl(url: string): void;
    goBack(): void;
    updateData(location: any): void;
    data: Readonly<IData>;
    prevData: Readonly<IData>;
    pvtListeners: any;
    setData(data: Partial<IData>): void;
    subscribe(listener: import("mdel").TListener): import("mdel").TUnSubscribe;
};
export default _default;
