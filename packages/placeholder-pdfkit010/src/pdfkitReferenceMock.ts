import PDFAbstractReference from './pdfkit/abstract_reference';

class PDFKitReferenceMock extends PDFAbstractReference {
    index: number;
    
    constructor(index: number, additionalData = undefined) {
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

export default PDFKitReferenceMock;
