import {Model} from 'mdel'
import {createBrowserHistory} from "history";
import qs from 'qs'


interface IQuery {
    [index: string]: string
}

interface IData {
    pathname: string,
    search: string,
    query: IQuery
}

export default new class HistoryModel extends Model<IData> {
    history;

    constructor() {
        super({
            pathname: '',
            search: '',
            query: {}
        });

        this.history = createBrowserHistory();

        this.updateData(this.history.location);
        this.history.listen(location => this.updateData(location));
    }

    changeQuery(query: IQuery) {
        this.history.push({
            pathname: this.data.pathname,
            search: qs(query)
        })
    }

    changeUrl(url: string) {
        this.history.push(url)
    }

    goBack() {
        this.history.goBack();
    }

    private updateData(location) {
        const query = qs(location.search);
        const newData = {
            pathname: location.pathname,
            search: location.search,
            query
        };
        // @ts-ignore
        this.setData(newData)
    }
}
