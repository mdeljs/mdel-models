import {Model} from 'mdel'
import qs from 'qs'


export interface IHistoryQuery {
  [index: string]: string | number
}

export interface IHistoryData {
  pathname: string,
  search: string,
  query: IHistoryQuery
}


export class HistoryModel extends Model<IHistoryData> {
  static getIsSearchChange(store: Model<any>) {
    return (
      store instanceof HistoryModel &&
      store.prevData.pathname === store.data.pathname &&
      store.prevData.search !== store.data.search
    )
  }

  history;

  constructor(history) {
    super(getData(history.location));

    this.history = history;
    this.history.listen(location => {
      this.setData(getData(location))
    });

    function getData(location) {
      const search = location.search;
      const query = qs.parse(search.replace(/^\?/, ''));

      return {
        search, query,
        pathname: location.pathname
      }
    }
  }

  setQuery(query: IHistoryQuery) {
    this.history.push({
      pathname: this.data.pathname,
      search: qs.stringify(query)
    })
  }

  setUrl(url: string) {
    this.history.push(url)
  }

  goBack() {
    this.history.goBack();
  }
}
