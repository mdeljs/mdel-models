import * as React from 'react'
import {render} from 'react-dom'

import ItemExample from "./models/item";
import ModalExample from "./models/modal";


function Root() {
  return <div>
    <h1>演示</h1>
    <ul>
      <li key={1}>
        ItemModel: <br/>
        <ItemExample/>
      </li>
      <li key={2}>
        ModalModel: <br/>
        <ModalExample/>
      </li>
    </ul>
  </div>
}

export default render(<Root/>, document.getElementById('app'));
