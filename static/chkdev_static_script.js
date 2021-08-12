"use strict";
//CHKDEV STATIC - 13.08.2021 03:39
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
(function () {
    window.chkdev = {};
    window.chkdev.eventVariables = {};
    window.chkdev.eventVariables.events = {};
    window.chkdev.eventVariables = new Proxy(window.chkdev.eventVariables, {
        set: function (target, property, value) {
            if (target[property]) {
                if (target[property] === value) {
                    return true;
                }
            }
            target[property] = value;
            if (!target.events[property]) {
                target.events[property] = "";
                return true;
            }
            if (target.events[property] === "") {
                return true;
            }
            target.events[property](value);
            return true;
        }
    });
    window.chkdev.setVariableChangeEvent = function (variable, callback) {
        if (!(variable in window.chkdev.eventVariables.events)) {
            console.error("Event variable with name \"" + variable + "\" doesn't exist");
        }
        else {
            window.chkdev.eventVariables.events[variable] = callback;
        }
    };
    window.chkdev.isObject = function (variable) {
        if (typeof variable === "object" && variable !== null) {
            return true;
        }
        else {
            return false;
        }
    };
    window.chkdev.getURLParams = function () {
        var e_1, _a;
        var obj = {};
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var entries = urlParams.entries();
        try {
            for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                var entry = entries_1_1.value;
                obj[entry[0]] = entry[1];
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (entries_1_1 && !entries_1_1.done && (_a = entries_1["return"])) _a.call(entries_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return obj;
    };
    var AJAX = /** @class */ (function () {
        function AJAX(sendInfo, requestPayload, options) {
            this.url = sendInfo.url;
            this.method = (sendInfo.method || "GET").toUpperCase();
            this.payload = requestPayload;
            this.options = options;
            this.responseType = options.responseType || "text";
            this.initFunc();
            //this.sendRequest();
        }
        AJAX.prototype.initFunc = function () {
            this.sendGetRequest = this.sendGetRequest.bind(this);
            this.sendPostRequest = this.sendPostRequest.bind(this);
            this.funcMap = new Map([
                ["GET", this.sendGetRequest],
                ["POST", this.sendPostRequest],
            ]);
        };
        AJAX.prototype.sendRequest = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this.funcMap)
                        return [2 /*return*/, this.handleResponse(this.funcMap.get(this.method)())];
                    return [2 /*return*/];
                });
            });
        };
        AJAX.prototype.sendGetRequest = function () {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); });
        };
        AJAX.prototype.sendPostRequest = function () {
            return __awaiter(this, void 0, void 0, function () {
                var postPayload, payloadType, payloadObjectKeys, request, request;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            payloadType = null;
                            if (this.payload) {
                                payloadObjectKeys = Object.keys(this.payload);
                                if (payloadObjectKeys.length > 0) {
                                    postPayload = this.preparePostPayload()[0];
                                    payloadType = this.preparePostPayload()[1];
                                }
                                else {
                                    postPayload = null;
                                    payloadType = null;
                                }
                            }
                            if (!(payloadType === "json")) return [3 /*break*/, 2];
                            return [4 /*yield*/, fetch(this.url, {
                                    method: "POST",
                                    body: postPayload,
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-Requested-With": "CRL"
                                    }
                                })];
                        case 1:
                            request = _a.sent();
                            return [2 /*return*/, request];
                        case 2: return [4 /*yield*/, fetch(this.url, {
                                method: "POST",
                                body: postPayload,
                                headers: {
                                    "X-Requested-With": "CRL"
                                }
                            })];
                        case 3:
                            request = _a.sent();
                            return [2 /*return*/, request];
                    }
                });
            });
        };
        AJAX.prototype.preparePostPayload = function () {
            switch (this.options.postBodyType) {
                case "json":
                    return [JSON.stringify(this.payload), "json"];
                    break;
                case "formdata":
                    var formdata = new FormData();
                    if (window.chkdev.isObject(this.payload)) {
                        // @ts-ignore
                        for (var key in this.payload) {
                            if (this.payload.hasOwnProperty(key)) {
                                // @ts-ignore
                                formdata.append(key, this.payload[key]);
                            }
                        }
                        return [formdata, "formdata"];
                    }
                    break;
            }
            return [null, "null"];
        };
        AJAX.prototype.handleResponse = function (responsePromise) {
            return __awaiter(this, void 0, void 0, function () {
                var response, _a, responseTextPromise, responseText, responseJsonPromise, responseJson;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            responsePromise["catch"](function (error) {
                                console.warn("Request failed. Server unavailable");
                            });
                            return [4 /*yield*/, responsePromise];
                        case 1:
                            response = _b.sent();
                            if (!response.ok) return [3 /*break*/, 7];
                            _a = this.responseType;
                            switch (_a) {
                                case "text": return [3 /*break*/, 2];
                                case "json": return [3 /*break*/, 4];
                            }
                            return [3 /*break*/, 6];
                        case 2:
                            responseTextPromise = response.text();
                            responseTextPromise["catch"](function (error) {
                                console.warn("Text convertation failed.");
                            });
                            return [4 /*yield*/, responseTextPromise];
                        case 3:
                            responseText = _b.sent();
                            return [2 /*return*/, responseText];
                        case 4:
                            responseJsonPromise = response.json();
                            responseJsonPromise["catch"](function (error) {
                                console.warn("Json convertation failed.");
                            });
                            return [4 /*yield*/, responseJsonPromise];
                        case 5:
                            responseJson = _b.sent();
                            return [2 /*return*/, responseJson];
                        case 6: return [3 /*break*/, 8];
                        case 7: return [2 /*return*/, "error"];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        return AJAX;
    }());
    window.chkdev.ajax = AJAX;
})();
