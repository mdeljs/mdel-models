import React from "react";
import {observe} from "mdel-react";
import ItemModel from "../../es/item";


@observe
export default class ItemExample extends React.Component{
  sItem = new ItemModel({
    title:'标题',
    content:'内容加载中...'
  });

  componentDidMount() {
    setTimeout(()=>{
      this.sItem.setData({
        content:'新内容'
      })
    },3000);
  }

  render() {
    return <div>
      <h4>{this.sItem.data.title}</h4>
      <div>{this.sItem.data.content}</div>
    </div>
  }
}
