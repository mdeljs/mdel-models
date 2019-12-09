import {Model} from "mdel";

export interface ListCounts {
  pageNo: number,
  pageSize: number,
  totalNum: number,

  [index: string]: any
}

export interface ListData {
  loading: boolean,

  counts: ListCounts,
  items: any[],

  selected: any[],
  expanded: any[]
}

export class ListModel extends Model<ListData> {
  itemKey;

  constructor(itemKey = 'id') {
    super({
      loading: false,

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


  setItems(items, counts: ListCounts = ({} as ListCounts)) {
    this.setData({
      counts: {
        ...counts,
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

    this.setItems(items, counts)
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
