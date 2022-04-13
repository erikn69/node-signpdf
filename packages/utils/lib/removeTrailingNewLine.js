"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const SignPdfError_1 = require("./SignPdfError");
const sliceLastChar = (pdf, character) => {
    const lastChar = pdf.slice(pdf.length - 1).toString();
    if (lastChar === character) {
        return pdf.slice(0, pdf.length - 1);
    }
    return pdf;
};
const removeTrailingNewLine = (pdf) => {
    if (!(pdf instanceof Buffer)) {
        throw new SignPdfError_1.default('PDF expected as Buffer.', SignPdfError_1.SignPdfErrorType.INPUT);
    }
    let output = pdf;
    output = sliceLastChar(output, '\n');
    output = sliceLastChar(output, '\r');
    const lastLine = output.slice(output.length - 6).toString();
    if (lastLine !== '\n%%EOF') {
        throw new SignPdfError_1.default('A PDF file must end with an EOF line.', SignPdfError_1.SignPdfErrorType.PARSE);
    }
    return output;
};
exports.default = removeTrailingNewLine;
//# sourceMappingURL=removeTrailingNewLine.js.map