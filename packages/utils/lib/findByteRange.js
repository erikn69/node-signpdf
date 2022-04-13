"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const SignPdfError_1 = require("./SignPdfError");
const const_1 = require("./const");
const findByteRange = (pdf) => {
    if (!(pdf instanceof Buffer)) {
        throw new SignPdfError_1.default('PDF expected as Buffer.', SignPdfError_1.SignPdfErrorType.INPUT);
    }
    const byteRangeStrings = pdf
        .toString()
        .match(/\/ByteRange\s*\[{1}\s*(?:(?:\d*|\/\*{10})\s+){3}(?:\d+|\/\*{10}){1}\s*]{1}/g);
    if (!byteRangeStrings) {
        throw new SignPdfError_1.default('No ByteRangeStrings found within PDF buffer', SignPdfError_1.SignPdfErrorType.PARSE);
    }
    const byteRangePlaceholder = byteRangeStrings
        .find((s) => s.includes(`/${const_1.DEFAULT_BYTE_RANGE_PLACEHOLDER}`));
    const byteRanges = byteRangeStrings
        .map((brs) => brs.match(/[^[\s]*(?:\d|\/\*{10})/g));
    return {
        byteRangePlaceholder,
        byteRangeStrings,
        byteRanges,
    };
};
exports.default = findByteRange;
//# sourceMappingURL=findByteRange.js.map