import {Model} from 'mdel'
import qs from 'qs'


interface IQuery {
  [index: string]: string | number
}

interface IData {
  pathname: string,
  search: string,
  query: IQuery
}


export default class HistoryModel extends Model<IData> {
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

  setQuery(query: IQuery) {
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
