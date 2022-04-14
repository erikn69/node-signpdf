import PDFAbstractReference from './pdfkit/abstract_reference';
declare class PDFKitReferenceMock extends PDFAbstractReference {
    index: number;
    constructor(index: number, additionalData?: any);
    toString(): string;
}
export default PDFKitReferenceMock;
