"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorController = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        // error: err,
        // stack: err.stack,
        message: err.message,
    });
};
exports.default = errorController;
//# sourceMappingURL=errorController.js.map