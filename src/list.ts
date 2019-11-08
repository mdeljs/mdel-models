import {Model} from "mdel";

interface IListCounts {
  pageNo: number,
  pageSize: number,
  totalNum: number,

  [index: string]: any
}

interface IListData {
  loading: boolean,

  counts: IListCounts,
  items: any[],

  selected: any[],
  expanded: any[]
}

export class ListModel extends Model<IListData> {
  itemKey;

  constructor(itemKey = 'id') {
    super({
      loading: true,

      items: [],
      counts: {
        pageNo: 0,
        pageSize: 0,
        totalNum: 0
      },

      selected: [],
      expanded: []
    });

    this.itemKey = itemKey;
  }

  setLoading(status: boolean) {
    this.setData({
      loading: status
    });
  }


  setItems(items, counts: IListCounts = ({} as IListCounts)) {
    this.setData({
      counts: {
        pageNo: Number(counts.pageNo) || 0,
        pageSize: Number(counts.pageSize) || 0,
        totalNum: Number(counts.totalNum) || 0
      },
      loading: false,
      items: items || [],

      selected: [],
      expanded: []
    })
  }

  deleteItems(keys: any[]) {
    let {items, counts} = this.data;

    items = items.filter(item => {
      if (keys.includes(item[this.itemKey])) {
        counts.totalNum -= 1;
        return false;
      }

      return true;
    });

    this.setData({items, counts})
  }

  updateItems(keys, data) {
    const items = this.data.items.map(item => {
      if (keys.includes(item[this.itemKey])) {
        Object.assign(item, data);
      }

      return item;
    });

    this.setItems(items, this.data.counts)
  }

  setSelected = (keys: any[]) => {
    this.setData({
      selected: keys
    });
  };

  setExpanded = (keys: any[]) => {
    this.setData({
      expanded: keys
    });
  }
}
