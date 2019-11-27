import {Model} from 'mdel'

export interface ModalData {
  visible: boolean,
  payload: {
    [index: string]: any
  }
}

function getModalStore(component) {
  return Object.keys(component || {})
    .map(key => component[key])
    .find(store => store instanceof ModalModel)
}

export class ModalModel extends Model<ModalData> {
  static show(component, payload = {}) {
    const modalStore = getModalStore(component);
    if (modalStore) {
      modalStore.setData({
        visible: true,
        payload
      });
    }
  }

  static hide(component) {
    const modalStore = getModalStore(component);
    if (modalStore) {
      modalStore.setData({
        visible: false,
        payload: {}
      });
    }
  }

  static getIsVisibleChange(store: Model) {
    return (
      store instanceof ModalModel &&
      store.prevData.visible !== store.data.visible
    )
  }


  constructor() {
    super({
      visible: false,
      payload: {}
    });
  }
}
