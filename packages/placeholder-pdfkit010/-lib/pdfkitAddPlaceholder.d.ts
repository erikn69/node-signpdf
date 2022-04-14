declare const pdfkitAddPlaceholder: ({ pdf, pdfBuffer, reason, contactInfo, name, location, signatureLength, byteRangePlaceholder, subFilter, }: {
    pdf: any;
    pdfBuffer: any;
    reason: any;
    contactInfo?: string;
    name?: string;
    location?: string;
    signatureLength?: number;
    byteRangePlaceholder?: string;
    subFilter?: string;
}) => {
    signature: any;
    form: any;
    widget: any;
};
export default pdfkitAddPlaceholder;
