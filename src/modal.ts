import {Model} from 'mdel'

interface IData {
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

export default class ModalModel extends Model<IData> {
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

    static getIsShow(store: Model) {
        return (
            store instanceof ModalModel &&
            store.prevData.visible !== store.data.visible &&
            store.data.visible
        )
    }

    constructor() {
        super({
            visible: false,
            payload: {}
        });
    }
}
