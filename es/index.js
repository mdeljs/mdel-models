import { Model, isObject } from 'mdel';
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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var ItemModel = /** @class */ (function (_super) {
    __extends(ItemModel, _super);
    function ItemModel(data) {
        return _super.call(this, data) || this;
    }
    ItemModel.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
    };
    return ItemModel;
}(Model));

var ListModel = /** @class */ (function (_super) {
    __extends(ListModel, _super);
    function ListModel(itemKey) {
        if (itemKey === void 0) { itemKey = 'id'; }
        var _this = _super.call(this, {
            loading: false,
            items: [],
            counts: {
                pageNo: 0,
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
            counts: __assign(__assign({}, counts), { pageNo: Number(counts.pageNo) || 0, pageSize: Number(counts.pageSize) || 0, totalNum: Number(counts.totalNum) || 0 }),
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
        this.setItems(items, counts);
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
    ModalModel.getIsVisibleChange = function (store) {
        return (store instanceof ModalModel &&
            store.prevData.visible !== store.data.visible);
    };
    return ModalModel;
}(Model));

var HistoryModel = /** @class */ (function (_super) {
    __extends(HistoryModel, _super);
    function HistoryModel(history) {
        var _this = _super.call(this, getData(history.location)) || this;
        _this.history = history;
        _this.history.listen(function (location) {
            _this.setData(getData(location));
        });
        function getData(location) {
            var search = location.search;
            var query = qs.parse(search, { ignoreQueryPrefix: true });
            return {
                search: search, query: query,
                pathname: location.pathname
            };
        }
        return _this;
    }
    HistoryModel.getIsSearchChange = function (store) {
        return (store instanceof HistoryModel &&
            store.prevData.pathname === store.data.pathname &&
            store.prevData.search !== store.data.search);
    };
    HistoryModel.prototype.setQuery = function (query) {
        this.history.push({
            pathname: this.data.pathname,
            search: qs.stringify(query)
        });
    };
    HistoryModel.prototype.setUrl = function (url) {
        this.history.push(url);
    };
    HistoryModel.prototype.goBack = function () {
        this.history.goBack();
    };
    return HistoryModel;
}(Model));

var FormModel = /** @class */ (function (_super) {
    __extends(FormModel, _super);
    function FormModel(initialFields) {
        var _this = this;
        var keys = Object.keys(initialFields);
        var data = __assign({ loading: false }, initialFields);
        //必填处理
        keys.forEach(function (key) {
            data[key].name = data[key].name || '';
            data[key].validators = data[key].validators ? data[key].validators.sort(function (a, b) {
                if (a && a.requiredValidator === true) {
                    return -1;
                }
                return 1;
            }) : [];
            data[key].error = data[key].error || '';
        });
        _this = _super.call(this, data) || this;
        _this.fieldKeys = keys;
        _this.initialValues = _this.cloneValues();
        return _this;
    }
    FormModel.prototype.setLoading = function (status) {
        this.setData({
            loading: status
        });
    };
    FormModel.prototype.setValues = function (values) {
        var _this = this;
        var newFields = {};
        this.fieldKeys.forEach(function (key) {
            var field = newFields[key] = _this.data[key];
            field['error'] = '';
            if (values.hasOwnProperty(key)) {
                field['value'] = values[key];
            }
        });
        this.setData(newFields);
    };
    FormModel.prototype.resetValues = function (initialValues) {
        this.setValues(initialValues || this.initialValues);
        this.initialValues = this.cloneValues();
    };
    FormModel.prototype.validateValues = function () {
        var _this = this;
        var sleep = function (time) { return new Promise(function (resolve) { return setTimeout(resolve, time); }); };
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var errorMessage, newFields;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errorMessage = null;
                        newFields = {};
                        this.fieldKeys.forEach(function (key) {
                            var field = _this.data[key];
                            var isRequired = field.validators.length && field.validators[0] && field.validators[0].requiredValidator;
                            if (!isRequired && !FormModel.rules.required()(field.value) === null)
                                return;
                            for (var _i = 0, _a = field.validators; _i < _a.length; _i++) {
                                var validator = _a[_i];
                                var error = validator(field.value);
                                newFields[key] = __assign({}, field);
                                if (error !== null) {
                                    newFields[key]['error'] = error;
                                    errorMessage = errorMessage || error;
                                    break;
                                }
                            }
                        });
                        return [4 /*yield*/, sleep(100)];
                    case 1:
                        _a.sent();
                        this.setData(newFields);
                        if (errorMessage === null) {
                            resolve(this.cloneValues());
                        }
                        else {
                            reject(errorMessage);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    FormModel.prototype.cloneValues = function () {
        var _this = this;
        var result = {};
        this.fieldKeys.forEach(function (key) {
            result[key] = _this.data[key].value;
        });
        return result;
    };
    FormModel.rules = {
        required: function (options) {
            if (options === void 0) { options = {}; }
            var errorMessage = options.errorMessage || '必填';
            function validator(value) {
                if (['', undefined, null].includes(value)) {
                    return errorMessage;
                }
                if (Array.isArray(value) && value.length === 0) {
                    return errorMessage;
                }
                if (isObject(value) && Object.keys(value).length === 0) {
                    return errorMessage;
                }
                return null;
            }
            validator.requiredValidator = true;
            return validator;
        }
    };
    return FormModel;
}(Model));

export { FormModel, HistoryModel, ItemModel, ListModel, ModalModel };
