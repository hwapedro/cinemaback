"use strict";
// generate controller
// generate service 
// generate module
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
var fs = require("fs-extra");
var config_1 = require("./config");
var path = require("path");
var helpers_1 = require("./helpers");
var root = config_1["default"].root;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var modules, controllerTemplate, serviceTemplate, moduleTemplate, _i, modules_1, m, name_1, modelName, uppercaseName, controller, service, zmodule;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                modules = [
                    {
                        name: 'actor',
                        plural: 'actors',
                        modelName: 'Actor'
                    },
                    {
                        name: 'ageRule',
                        plural: 'ageRules',
                        modelName: 'AgeRule'
                    },
                    {
                        name: 'cinema',
                        plural: 'cinemas',
                        modelName: 'Cinema'
                    },
                    {
                        name: 'comment',
                        plural: 'comments',
                        modelName: 'Comment'
                    },
                    {
                        name: 'film',
                        plural: 'films',
                        modelName: 'Film'
                    },
                    {
                        name: 'genre',
                        plural: 'genres',
                        modelName: 'Genre'
                    },
                    {
                        name: 'hall',
                        plural: 'halls',
                        modelName: 'Hall'
                    },
                    {
                        name: 'news',
                        plural: 'news',
                        modelName: 'News'
                    },
                    {
                        name: 'shop',
                        plural: 'shops',
                        modelName: 'Shop'
                    },
                    {
                        name: 'shopItem',
                        plural: 'shopItems',
                        modelName: 'ShopItem'
                    },
                    {
                        name: 'ticket',
                        plural: 'tickets',
                        modelName: 'Ticket'
                    },
                    {
                        name: 'showtime',
                        plural: 'showtimes',
                        modelName: 'Showtime'
                    },
                ]
                    .map(function (m) {
                    if (!m.uppercaseName) {
                        m.uppercaseName = m.name[0].toUpperCase() + m.name.slice(1);
                    }
                    return m;
                })
                    .filter(function (m) {
                    return process.argv[2] ? m.name.indexOf(process.argv[2]) > -1 : true;
                });
                return [4 /*yield*/, fs.readFile("" + path.resolve(__dirname, 'templates/controller.tmp'))];
            case 1:
                controllerTemplate = (_a.sent()).toString();
                return [4 /*yield*/, fs.readFile("" + path.resolve(__dirname, 'templates/service.tmp'))];
            case 2:
                serviceTemplate = (_a.sent()).toString();
                return [4 /*yield*/, fs.readFile("" + path.resolve(__dirname, 'templates/module.tmp'))];
            case 3:
                moduleTemplate = (_a.sent()).toString();
                _i = 0, modules_1 = modules;
                _a.label = 4;
            case 4:
                if (!(_i < modules_1.length)) return [3 /*break*/, 10];
                m = modules_1[_i];
                name_1 = m.name, modelName = m.modelName, uppercaseName = m.uppercaseName;
                controller = {
                    name: name_1 + ".controller.ts",
                    content: helpers_1.format(controllerTemplate, __assign({}, m))
                };
                return [4 /*yield*/, fs.ensureDir("" + path.resolve(root, 'src', name_1))];
            case 5:
                _a.sent();
                // save controller
                return [4 /*yield*/, fs.writeFile("" + path.resolve(root, 'src', name_1, name_1 + ".controller.ts"), controller.content)];
            case 6:
                // save controller
                _a.sent();
                service = {
                    name: name_1 + ".service.ts",
                    content: helpers_1.format(serviceTemplate, __assign({}, m))
                };
                // save service
                return [4 /*yield*/, fs.writeFile("" + path.resolve(root, 'src', name_1, name_1 + ".service.ts"), service.content)];
            case 7:
                // save service
                _a.sent();
                zmodule = {
                    name: name_1 + ".module.ts",
                    content: helpers_1.format(moduleTemplate, __assign({}, m))
                };
                // save module
                return [4 /*yield*/, fs.writeFile("" + path.resolve(root, 'src', name_1, name_1 + ".module.ts"), zmodule.content)];
            case 8:
                // save module
                _a.sent();
                _a.label = 9;
            case 9:
                _i++;
                return [3 /*break*/, 4];
            case 10: return [2 /*return*/];
        }
    });
}); })();
