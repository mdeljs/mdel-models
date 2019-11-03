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

var ListModel = /** @class */ (function (_super) {
    __extends(ListModel, _super);
    function ListModel(itemKey) {
        if (itemKey === void 0) { itemKey = 'id'; }
        var _this = _super.call(this, {
            loading: true,
            items: [],
            counts: {
                currentPage: 0,
                pageSize: 0,
                totalNum: 0
            },
            selected: [],
            expanded: []
        }) || this;
        _this.setSelected = function (keys) {
            _this.setData({
                selected: keys
            });
        };
        _this.setExpanded = function (keys) {
            _this.setData({
                expanded: keys
            });
        };
        _this.itemKey = itemKey;
        return _this;
    }
    ListModel.prototype.setLoading = function (status) {
        this.setData({
            loading: status
        });
    };
    ListModel.prototype.setItems = function (items, counts) {
        if (counts === void 0) { counts = {}; }
        this.setData({
            counts: {
                currentPage: Number(counts.pageNo) || 0,
                pageSize: Number(counts.pageSize) || 0,
                totalNum: Number(counts.totalNum) || 0
            },
            loading: false,
            items: items || [],
            selected: [],
            expanded: []
        });
    };
    ListModel.prototype.deleteItems = function (keys) {
        var _this = this;
        var _a = this.data, items = _a.items, counts = _a.counts;
        items = items.filter(function (item) {
            if (keys.includes(item[_this.itemKey])) {
                counts.totalNum -= 1;
                return false;
            }
            return true;
        });
        this.setData({ items: items, counts: counts });
    };
    ListModel.prototype.updateItems = function (keys, data) {
        var _this = this;
        var items = this.data.items.map(function (item) {
            if (keys.includes(item[_this.itemKey])) {
                Object.assign(item, data);
            }
            return item;
        });
        this.setItems(items, this.data.counts);
    };
    return ListModel;
}(Model));

export default ListModel;