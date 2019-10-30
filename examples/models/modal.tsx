import React from "react";
import {Modal} from "antd";
import {observe} from "mdel-react";
import ModalModel from "../../es/modal";

import 'antd/dist/antd.css'

@observe
export default class ModalExample extends React.Component {
  sModal = new ModalModel();

  componentStoreChange(store){
    if(ModalModel.getIsShow(store)){
      alert('展示了弹窗');
    }
  }

  render() {
    return <div>
      <h2 onClick={() => {
        ModalModel.show(this, {
          title: '修改'
        })
      }}>
        打开弹窗
      </h2>
      <Modal
        visible={this.sModal.data.visible}
        title={this.sModal.data.payload.title}
        onCancel={() => {
          ModalModel.hide(this);
        }}
        onOk={() => {
          alert('确定');
          ModalModel.hide(this);
        }}
      >
        内容
      </Modal>
    </div>
  }
}
