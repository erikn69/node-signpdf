"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.SignPdfErrorType = void 0;
var SignPdfErrorType;
(function(SignPdfErrorType) {
    SignPdfErrorType["UNKNOWN"] = "UNKNOWN";
    SignPdfErrorType["INPUT"] = "INPUT";
    SignPdfErrorType["PARSE"] = "PARSE";
})(SignPdfErrorType = exports.SignPdfErrorType || (exports.SignPdfErrorType = {}));
class SignPdfError extends Error {
    constructor(msg, type = SignPdfErrorType.UNKNOWN) {
        super(msg);
        this.type = type;
    }
}
exports.default = SignPdfError;
//# sourceMappingURL=SignPdfError.js.map