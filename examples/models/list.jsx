import React from "react";
import {observe} from "mdel-react";
import {Table} from 'antd'
import {ListModel} from "../../es";

import 'antd/dist/antd.css'

@observe
export default class ListExample extends React.Component {
  sList = new ListModel('id');

  componentDidMount() {
    this.sList.setLoading(true);
    try {
      setTimeout(() => {
        this.sList.setItems([
          {id: 1, content: '1'},
          {id: 2, content: '2'}
        ])
      },2000)
    } catch (e) {
      this.sList.setLoading(false)
    }
  }

  columns = [
    {dataIndex: 'id', title: 'ID'},
    {dataIndex: 'content', title: '内容'},
  ];

  render() {
    return <Table size={'small'}
                  loading={this.sList.data.loading}
                  columns={this.columns}
                  rowKey={this.sList.itemKey}
                  dataSource={this.sList.data.items}
                  pagination={{
                    current: this.sList.data.counts.pageNo,
                    pageSize: this.sList.data.counts.pageSize,
                    total: this.sList.data.counts.totalNum
                  }}
                  rowSelection={{
                    selectedRowKeys: this.sList.data.selected,
                    onChange: this.sList.setSelected
                  }}/>
  }
}
