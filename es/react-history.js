import { Model } from 'mdel';
import qs from 'qs';

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

var HistoryModel = /** @class */ (function (_super) {
    __extends(HistoryModel, _super);
    function HistoryModel(history) {
        var _this = _super.call(this, {
            pathname: '',
            search: '',
            query: {}
        }) || this;
        _this.history = history;
        _this.updateData(_this.history.location);
        _this.history.listen(function (location) { return _this.updateData(location); });
        return _this;
    }
    HistoryModel.prototype.changeQuery = function (query) {
        this.history.push({
            pathname: this.data.pathname,
            search: qs.stringify(query)
        });
    };
    HistoryModel.prototype.changeUrl = function (url) {
        this.history.push(url);
    };
    HistoryModel.prototype.goBack = function () {
        this.history.goBack();
    };
    HistoryModel.prototype.updateData = function (location) {
        var query = qs.parse(location.search.replace(/^\?/, ''));
        this.setData({
            pathname: location.pathname,
            search: location.search,
            query: query
        });
    };
    return HistoryModel;
}(Model));

export default HistoryModel;
