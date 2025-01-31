"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import environment variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const process = __importStar(require("process"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const AppError_1 = require("./utils/AppError");
const StatusCodes_1 = require("./utils/StatusCodes");
const GlobalErrorHandler = __importStar(require("./exception/ExceptionHandler"));
const CustomResponse_1 = require("./utils/CustomResponse");
const DbConnection_1 = __importDefault(require("./db/DbConnection"));
// import {UserType} from "./models/UserModel";
const ClientRoutes_1 = __importDefault(require("./routes/ClientRoutes"));
// import VerifyRoutes from "./routes/VerifyRoutes";
// import {UserServiceImpl} from "./services/impl/UserServiceImpl";
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5500;
//set cors police
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
}));
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use('/api/client', ClientRoutes_1.default);
app.get('/health', (req, res, next) => {
    res.status(200).send(new CustomResponse_1.CustomResponse(StatusCodes_1.StatusCodes.SUCCESS, 'Back auth service server is running 🎉'));
});
// this should always be the end of the routs
//this is for unhandled routes
app.all('*', (req, res, next) => {
    next(new AppError_1.AppError(`Can't find ${req.originalUrl} path on the auth server`, 404, StatusCodes_1.StatusCodes.URL_NOT_FOUND));
});
DbConnection_1.default.sync({ force: true })
    .then(() => {
    console.log('Database synchronized');
});
//set global error handler middleware
app.use(GlobalErrorHandler.exceptionHandler);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
