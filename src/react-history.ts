import {Model} from 'mdel'
import qs from 'qs'


interface IQuery {
    [index: string]: string
}

interface IData {
    pathname: string,
    search: string,
    query: IQuery
}


export default class HistoryModel extends Model<IData> {
  history;

  constructor(history) {
    super({
      pathname: '',
      search: '',
      query: {}
    });

    this.history = history;

    this.updateData(this.history.location);
    this.history.listen(location => this.updateData(location));
  }

  changeQuery(query: IQuery) {
    this.history.push({
      pathname: this.data.pathname,
      search: qs.stringify(query)
    })
  }

  changeUrl(url: string) {
    this.history.push(url)
  }

  goBack() {
    this.history.goBack();
  }

  private updateData(location) {
    const query = qs.parse(location.search.replace(/^\?/,''));

    this.setData({
      pathname: location.pathname,
      search: location.search,
      query
    })
  }
}
