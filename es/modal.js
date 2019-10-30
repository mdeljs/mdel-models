import { Model } from 'mdel';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function getModalStore(component) {
    return Object.keys(component || {})
        .map(function (key) { return component[key]; })
        .find(function (store) { return store instanceof ModalModel; });
}
var ModalModel = /** @class */ (function (_super) {
    __extends(ModalModel, _super);
    function ModalModel() {
        return _super.call(this, {
            visible: false,
            payload: {}
        }) || this;
    }
    ModalModel.show = function (component, payload) {
        if (payload === void 0) { payload = {}; }
        var modalStore = getModalStore(component);
        if (modalStore) {
            modalStore.setData({
                visible: true,
                payload: payload
            });
        }
    };
    ModalModel.hide = function (component) {
        var modalStore = getModalStore(component);
        if (modalStore) {
            modalStore.setData({
                visible: false,
                payload: {}
            });
        }
    };
    ModalModel.getIsShow = function (store) {
        return (store instanceof ModalModel &&
            store.prevData.visible !== store.data.visible &&
            store.data.visible);
    };
    return ModalModel;
}(Model));

export default ModalModel;
