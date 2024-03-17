"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes/routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8081;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/v1', routes_1.router);
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});
exports.default = app;
