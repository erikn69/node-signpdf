"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTrailingNewLine = exports.findByteRange = exports.SignPdfError = void 0;
__exportStar(require("./SignPdfError"), exports);
var SignPdfError_1 = require("./SignPdfError");
Object.defineProperty(exports, "SignPdfError", { enumerable: true, get: function () { return SignPdfError_1.default; } });
__exportStar(require("./const"), exports);
var findByteRange_1 = require("./findByteRange");
Object.defineProperty(exports, "findByteRange", { enumerable: true, get: function () { return findByteRange_1.default; } });
var removeTrailingNewLine_1 = require("./removeTrailingNewLine");
Object.defineProperty(exports, "removeTrailingNewLine", { enumerable: true, get: function () { return removeTrailingNewLine_1.default; } });
//# sourceMappingURL=utils.js.map