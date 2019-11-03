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

var ReactHistoryModel = /** @class */ (function (_super) {
    __extends(ReactHistoryModel, _super);
    function ReactHistoryModel(history) {
        var _this = _super.call(this, getData(history.location)) || this;
        _this.history = history;
        _this.history.listen(function (location) {
            _this.setData(getData(location));
        });
        function getData(location) {
            var search = location.search;
            var query = qs.parse(search.replace(/^\?/, ''));
            return {
                search: search, query: query,
                pathname: location.pathname
            };
        }
        return _this;
    }
    ReactHistoryModel.getIsSearchChange = function (store) {
        return (store instanceof ReactHistoryModel &&
            store.prevData.pathname === store.data.pathname &&
            store.prevData.search !== store.data.search);
    };
    ReactHistoryModel.prototype.setQuery = function (query) {
        this.history.push({
            pathname: this.data.pathname,
            search: qs.stringify(query)
        });
    };
    ReactHistoryModel.prototype.setUrl = function (url) {
        this.history.push(url);
    };
    ReactHistoryModel.prototype.goBack = function () {
        this.history.goBack();
    };
    return ReactHistoryModel;
}(Model));

export default ReactHistoryModel;
