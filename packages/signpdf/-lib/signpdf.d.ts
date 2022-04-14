/// <reference types="node" />
export declare class SignPdf {
    byteRangePlaceholder: string;
    lastSignature: string;
    constructor();
    sign(pdfBuffer: any, p12Buffer: any, additionalOptions?: {}): Buffer;
}
declare const _default: SignPdf;
export default _default;
