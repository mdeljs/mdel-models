# mdel-models
一些数据模型

## 安装

* 安装：`npm install mdel-models --save`

## 使用示例

```jsx harmony
import React from "react";
import {createBrowserHistory} from "history";
import {HistoryModel} from "mdel-models";
import {observe} from "mdel-react";

const history = createBrowserHistory();

@observe
class HistoryExample extends React.Component{
  sHistory = new HistoryModel(history);

  render() {
    return <div>
      pathname:{this.sHistory.data.pathname}<br/>
      search:{this.sHistory.data.search}<br/>

      <a onClick={()=>{
        this.sHistory.setUrl(`/time/${Date.now()}?page=1`);
      }}>setUrl</a>&emsp;
      <a onClick={()=>{
        this.sHistory.setQuery({
          page:2
        })
      }}>changeQuery</a>
    </div>
  }
}
```

## 说明

* examples目录下的为示例代码.查看演示,终端执行以下命令,然后打开浏览器,输入http://localhost:1234

```shell script
npm install
npm start
```

## API

### ItemModel
项模型
```typescript jsx
import {Model} from "mdel";
declare interface ItemData {
    [index: string]: any;
}
declare class ItemModel<T extends ItemData> extends Model<T> {
    constructor(data: T);
    //设置数据
    setData(data: Partial<T>): void;
}
```

### ListModel
列表模型
```typescript jsx
import {Model} from "mdel";
declare interface IListCounts {
    //当前页
    pageNo: number;
    //每页条数
    pageSize: number;
    //总共条数
    totalNum: number;
    [index: string]: any;
}
declare interface ListData {
    loading: boolean;
    counts: IListCounts;
    items: any[];
    //选择的行keys
    selected: any[];
    //展开的行keys
    expanded: any[];
}
declare class ListModel extends Model<ListData> {
    itemKey: any;
    constructor(itemKey?: string);
    setLoading(status: boolean): void;
    setItems(items: any, counts?: IListCounts): void;
    deleteItems(keys: any[]): void;
    updateItems(keys: any, data: any): void;
    setSelected: (keys: any[]) => void;
    setExpanded: (keys: any[]) => void;
}
```

### ModalModel
弹窗模型
```typescript jsx
import {Model} from "mdel";
declare interface ModalData {
    visible: boolean;
    payload: {
        [index: string]: any;
    };
}
declare class ModalModel extends Model<ModalData> {
    //展示弹窗
    static show(component: any, payload?: {}): void;
    //隐藏弹窗
    static hide(component: any): void;
    //获得弹窗是否展示改变
    static getIsVisibleChange(store: Model): boolean;
    constructor();
}
```

### HistoryModel
history模型
```typescript jsx
import {Model} from "mdel";
declare interface HistoryQuery {
    [index: string]: string | number;
}
declare interface HistoryData {
    pathname: string;
    search: string;
    query: HistoryQuery;
}
declare class HistoryModel extends Model<HistoryData> {
    //获得是否search改变
    static getIsSearchChange(store: Model<any>): boolean;
    history: any;
    constructor(history: any);
    //设置query
    setQuery(query: HistoryQuery): void;
    //设置url
    setUrl(url: string): void;
    //返回
    goBack(): void;
}
```

## 更新日志

### 3.0.6
1. 优化类型命名
