# mdel-models
一些数据模型

## 安装

* 安装：`npm install mdel-models --save`

## mdel

**mdel** 是一个数据管理器，文档 [链接](https://github.com/mdeljs/mdel)

## 使用

* 查看演示

```shell script
npm start
```

打开浏览器,输入http://localhost:1234

## 示例

```jsx harmony
import React from "react";
import {createBrowserHistory} from "history";
import HistoryModel from "mdel-models/react-history";
import {observe} from "mdel-react";

const history = createBrowserHistory();

@observe
class ReactHistoryExample extends React.Component{
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
## API

### ItemModel
### ListModel
### ModalModel
### ReactHistoryModel
