"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultRoutes = exports.userDataRoutes = exports.authRoutes = void 0;
var authRoutes_1 = require("./authRoutes");
Object.defineProperty(exports, "authRoutes", { enumerable: true, get: function () { return __importDefault(authRoutes_1).default; } });
var userDataRoutes_1 = require("./userDataRoutes");
Object.defineProperty(exports, "userDataRoutes", { enumerable: true, get: function () { return __importDefault(userDataRoutes_1).default; } });
var resultRoutes_1 = require("./resultRoutes");
Object.defineProperty(exports, "resultRoutes", { enumerable: true, get: function () { return __importDefault(resultRoutes_1).default; } });
