"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const appError_1 = __importDefault(require("./utils/appError"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = express_1.default();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan_1.default('dev'));
}
if (process.env.DB_STRING && process.env.DB_PASSWORD) {
    const dbString = process.env.DB_STRING.replace('<PASSWORD>', process.env.DB_PASSWORD);
    mongoose_1.default
        .connect(dbString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
        .then(() => console.log('-----Database connected!!!'))
        .catch((err) => console.log('-----Database connect failed!!!', err));
}
else {
    throw new Error('Database environment variables not found');
}
/////////////////////////////////////////////////////////////////////
app.use(express_1.default.json());
app.use('/api/users', cors_1.default(), userRoutes_1.default);
app.all('*', (req, res, next) => {
    next(new appError_1.default(`Cannot find ${req.originalUrl}`, 404));
});
app.use(errorController_1.default);
/////////////////////////////////////////////////////////////////////
process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('-----Uncaught Exception. App closing...');
    process.exit(1);
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`-----App running on port ${port}...`));
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
//# sourceMappingURL=app.js.map