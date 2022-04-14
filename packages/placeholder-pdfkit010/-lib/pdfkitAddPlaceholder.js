"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@signpdf/utils");
const pdfkitReferenceMock_1 = require("./pdfkitReferenceMock");
const pdfkitAddPlaceholder = ({ pdf, pdfBuffer, reason, contactInfo = 'emailfromp1289@gmail.com', name = 'Name from p12', location = 'Location from p12', signatureLength = utils_1.DEFAULT_SIGNATURE_LENGTH, byteRangePlaceholder = utils_1.DEFAULT_BYTE_RANGE_PLACEHOLDER, subFilter = utils_1.SUBFILTER_ADOBE_PKCS7_DETACHED, }) => {
    const signature = pdf.ref({
        Type: 'Sig',
        Filter: 'Adobe.PPKLite',
        SubFilter: subFilter,
        ByteRange: [
            0,
            byteRangePlaceholder,
            byteRangePlaceholder,
            byteRangePlaceholder,
        ],
        Contents: Buffer.from(String.fromCharCode(0).repeat(signatureLength)),
        Reason: new String(reason),
        M: new Date(),
        ContactInfo: new String(contactInfo),
        Name: new String(name),
        Location: new String(location),
    });
    const acroFormPosition = pdfBuffer.lastIndexOf('/Type /AcroForm');
    const isAcroFormExists = acroFormPosition !== -1;
    let fieldIds = [];
    let acroFormId;
    if (isAcroFormExists) {
        let acroFormStart = acroFormPosition;
        const charsUntilIdEnd = 10;
        const acroFormIdEnd = acroFormPosition - charsUntilIdEnd;
        const maxAcroFormIdLength = 12;
        let foundAcroFormId = '';
        let index = charsUntilIdEnd + 1;
        for (index; index < charsUntilIdEnd + maxAcroFormIdLength; index += 1) {
            const acroFormIdString = pdfBuffer
                .slice(acroFormPosition - index, acroFormIdEnd).toString();
            if (acroFormIdString[0] === '\n') {
                break;
            }
            foundAcroFormId = acroFormIdString;
            acroFormStart = acroFormPosition - index;
        }
        const pdfSlice = pdfBuffer.slice(acroFormStart);
        const acroForm = pdfSlice.slice(0, pdfSlice.indexOf('endobj')).toString();
        acroFormId = parseInt(foundAcroFormId);
        const acroFormFields = acroForm.slice(acroForm.indexOf('/Fields [') + 9, acroForm.indexOf(']'));
        fieldIds = acroFormFields
            .split(' ')
            .filter((element, i) => i % 3 === 0)
            .map((fieldId) => new pdfkitReferenceMock_1.default(fieldId));
    }
    const signatureName = 'Signature';
    const widget = pdf.ref({
        Type: 'Annot',
        Subtype: 'Widget',
        FT: 'Sig',
        Rect: [0, 0, 0, 0],
        V: signature,
        T: new String(signatureName + (fieldIds.length + 1)),
        F: 4,
        P: pdf.page.dictionary,
    });
    pdf.page.dictionary.data.Annots = [widget];
    let form;
    if (!isAcroFormExists) {
        form = pdf.ref({
            Type: 'AcroForm',
            SigFlags: 3,
            Fields: [...fieldIds, widget],
        });
    }
    else {
        form = pdf.ref({
            Type: 'AcroForm',
            SigFlags: 3,
            Fields: [...fieldIds, widget],
        }, acroFormId);
    }
    pdf._root.data.AcroForm = form;
    return {
        signature,
        form,
        widget,
    };
};
exports.default = pdfkitAddPlaceholder;
//# sourceMappingURL=pdfkitAddPlaceholder.js.map