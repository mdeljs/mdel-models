import * as React from "react";
import {FormModel} from "../../es";
import {observe} from "mdel-react";

import './style.less'

@observe
export default class FormExample extends React.Component {
  sForm = new FormModel({
    username: {
      value: '',
      validators: [FormModel.rules.required()]
    },
    password: {
      value: '',
      validators: [FormModel.rules.required()]
    }
  });

  onSubmit = async (e) => {
    e.preventDefault();

    try {
      this.sForm.setLoading(true);
      const values = await this.sForm.validateValues();
      await request(values);
      this.sForm.setLoading(false);
      alert(JSON.stringify(values));
    } catch (e) {
      this.sForm.setLoading(false);
    }
  };

  render() {
    return <form className={'form-wrap'} onSubmit={this.onSubmit}>
      <div>
        <label>用户名:</label>
        <input value={this.sForm.data.username.value} onChange={e => {
          this.sForm.setValues({
            username: e.target.value
          })
        }}/>
        <div className={'error'}>{this.sForm.data.username.error}</div>
      </div>
      <div>
        <label>密码:</label>
        <input type={'password'} value={this.sForm.data.password.value} onChange={e => {
          this.sForm.setValues({
            password: e.target.value
          })
        }}/>
        <div className={'error'}>{this.sForm.data.password.error}</div>
      </div>
      <button type={'submit'}>
        {this.sForm.data.loading ? 'loading...' : '提交'}
      </button>
    </form>
  }
}

async function request() {
  return new Promise(function (resolve) {
    setTimeout(resolve,1000);
  })
}
