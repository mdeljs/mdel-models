import * as React from 'react'
import {render} from 'react-dom'

import "babel-polyfill";

import ItemExample from "./models/item";
import ListExample from "./models/list";
import ModalExample from "./models/modal";
import HistoryExample from "./models/history";
import FormExample from "./models/form";


function Root() {
  return <div>
    <h1>演示</h1>
    <hr/>
    <h3>ItemModel:</h3>
    <ItemExample/>
    <hr/>
    <h3>ListModel:</h3>
    <ListExample/>
    <hr/>
    <h3>FormModel:</h3>
    <FormExample/>
    <hr/>
    <h3>ModalModel:</h3>
    <ModalExample/>
    <hr/>
    <h3>HistoryModel:</h3>
    <HistoryExample/>
  </div>
}

export default render(<Root/>, document.getElementById('app'));
