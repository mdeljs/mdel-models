import * as React from 'react'
import {render} from 'react-dom'

import ItemExample from "./models/item";
import ModalExample from "./models/modal";
import ReactHistoryExample from "./models/react-history";


function Root() {
  return <div>
    <h1>演示</h1>
    <ul>
      <li key={1}>
        <h3>ItemModel:</h3>
        <ItemExample/>
      </li>
      <li key={2}>
        <h3>ModalModel:</h3>
        <ModalExample/>
      </li>
      <li key={2}>
        <h3>ReactHistory:</h3>
        <ReactHistoryExample/>
      </li>
    </ul>
  </div>
}

export default render(<Root/>, document.getElementById('app'));
