import React from "react";
import {createBrowserHistory} from "history";
import {HistoryModel} from "../../es";
import {observe} from "mdel-react";

const history = createBrowserHistory();

@observe
export default class HistoryExample extends React.Component{
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
