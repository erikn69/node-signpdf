"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_reference_1 = require("./pdfkit/abstract_reference");
class PDFKitReferenceMock extends abstract_reference_1.default {
    constructor(index, additionalData = undefined) {
        super();
        this.index = index;
        if (typeof additionalData !== 'undefined') {
            Object.assign(this, additionalData);
        }
    }
    toString() {
        return `${this.index} 0 R`;
    }
}
exports.default = PDFKitReferenceMock;
//# sourceMappingURL=pdfkitReferenceMock.js.map