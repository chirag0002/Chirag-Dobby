"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("./user.route");
const image_route_1 = require("./image.route");
exports.router = (0, express_1.Router)();
exports.router.use('/user', user_route_1.router);
exports.router.use('/image', image_route_1.router);
