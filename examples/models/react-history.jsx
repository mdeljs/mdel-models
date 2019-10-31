import React from "react";
import {createBrowserHistory} from "history";
import HistoryModel from "../../es/react-history";
import {observe} from "mdel-react";

const historyStore = new HistoryModel(createBrowserHistory());

@observe
export default class ReactHistoryExample extends React.Component{
  sHistory = historyStore;

  render() {
    return <div>
      pathname:{this.sHistory.data.pathname}<br/>
      search:{this.sHistory.data.search}<br/>

      <a onClick={()=>{
        this.sHistory.changeUrl('/user?page=1');
      }}>changeUrl</a>&emsp;
      <a onClick={()=>{
        this.sHistory.changeQuery({
          page:2
        })
      }}>changeQuery</a>
    </div>
  }
}
