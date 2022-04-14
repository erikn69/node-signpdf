"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignPdf = void 0;
const node_forge_1 = require("node-forge");
const utils_1 = require("@signpdf/utils");
class SignPdf {
    constructor() {
        this.byteRangePlaceholder = utils_1.DEFAULT_BYTE_RANGE_PLACEHOLDER;
        this.lastSignature = null;
    }
    sign(pdfBuffer, p12Buffer, additionalOptions = {}) {
        const options = Object.assign({ asn1StrictParsing: false, passphrase: '' }, additionalOptions);
        if (!(pdfBuffer instanceof Buffer)) {
            throw new utils_1.SignPdfError('PDF expected as Buffer.', utils_1.SignPdfErrorType.INPUT);
        }
        if (!(p12Buffer instanceof Buffer)) {
            throw new utils_1.SignPdfError('p12 certificate expected as Buffer.', utils_1.SignPdfErrorType.INPUT);
        }
        let pdf = utils_1.removeTrailingNewLine(pdfBuffer);
        const { byteRangePlaceholder } = utils_1.findByteRange(pdf);
        if (!byteRangePlaceholder) {
            throw new utils_1.SignPdfError(`Could not find empty ByteRange placeholder: ${byteRangePlaceholder}`, utils_1.SignPdfErrorType.PARSE);
        }
        const byteRangePos = pdf.indexOf(byteRangePlaceholder);
        const byteRangeEnd = byteRangePos + byteRangePlaceholder.length;
        const contentsTagPos = pdf.indexOf('/Contents ', byteRangeEnd);
        const placeholderPos = pdf.indexOf('<', contentsTagPos);
        const placeholderEnd = pdf.indexOf('>', placeholderPos);
        const placeholderLengthWithBrackets = (placeholderEnd + 1) - placeholderPos;
        const placeholderLength = placeholderLengthWithBrackets - 2;
        const byteRange = [0, 0, 0, 0];
        byteRange[1] = placeholderPos;
        byteRange[2] = byteRange[1] + placeholderLengthWithBrackets;
        byteRange[3] = pdf.length - byteRange[2];
        let actualByteRange = `/ByteRange [${byteRange.join(' ')}]`;
        actualByteRange += ' '.repeat(byteRangePlaceholder.length - actualByteRange.length);
        pdf = Buffer.concat([
            pdf.slice(0, byteRangePos),
            Buffer.from(actualByteRange),
            pdf.slice(byteRangeEnd),
        ]);
        pdf = Buffer.concat([
            pdf.slice(0, byteRange[1]),
            pdf.slice(byteRange[2], byteRange[2] + byteRange[3]),
        ]);
        const forgeCert = node_forge_1.default.util.createBuffer(p12Buffer.toString('binary'));
        const p12Asn1 = node_forge_1.default.asn1.fromDer(forgeCert);
        const p12 = node_forge_1.default.pkcs12.pkcs12FromAsn1(p12Asn1, options.asn1StrictParsing, options.passphrase);
        const certBags = p12.getBags({
            bagType: node_forge_1.default.pki.oids.certBag,
        })[node_forge_1.default.pki.oids.certBag];
        const keyBags = p12.getBags({
            bagType: node_forge_1.default.pki.oids.pkcs8ShroudedKeyBag,
        })[node_forge_1.default.pki.oids.pkcs8ShroudedKeyBag];
        const privateKey = keyBags[0].key;
        const p7 = node_forge_1.default.pkcs7.createSignedData();
        p7.content = node_forge_1.default.util.createBuffer(pdf.toString('binary'));
        let certificate;
        Object.keys(certBags).forEach((i) => {
            const { publicKey } = certBags[i].cert;
            p7.addCertificate(certBags[i].cert);
            if (privateKey.n.compareTo(publicKey.n) === 0
                && privateKey.e.compareTo(publicKey.e) === 0) {
                certificate = certBags[i].cert;
            }
        });
        if (typeof certificate === 'undefined') {
            throw new utils_1.SignPdfError('Failed to find a certificate that matches the private key.', utils_1.SignPdfErrorType.INPUT);
        }
        p7.addSigner({
            key: privateKey,
            certificate,
            digestAlgorithm: node_forge_1.default.pki.oids.sha256,
            authenticatedAttributes: [
                {
                    type: node_forge_1.default.pki.oids.contentType,
                    value: node_forge_1.default.pki.oids.data,
                }, {
                    type: node_forge_1.default.pki.oids.messageDigest,
                }, {
                    type: node_forge_1.default.pki.oids.signingTime,
                    value: new Date(),
                },
            ],
        });
        p7.sign({ detached: true });
        const raw = node_forge_1.default.asn1.toDer(p7.toAsn1()).getBytes();
        if ((raw.length * 2) > placeholderLength) {
            throw new utils_1.SignPdfError(`Signature exceeds placeholder length: ${raw.length * 2} > ${placeholderLength}`, utils_1.SignPdfErrorType.INPUT);
        }
        let signature = Buffer.from(raw, 'binary').toString('hex');
        this.lastSignature = signature;
        signature += Buffer
            .from(String.fromCharCode(0).repeat((placeholderLength / 2) - raw.length))
            .toString('hex');
        pdf = Buffer.concat([
            pdf.slice(0, byteRange[1]),
            Buffer.from(`<${signature}>`),
            pdf.slice(byteRange[1]),
        ]);
        return pdf;
    }
}
exports.SignPdf = SignPdf;
exports.default = new SignPdf();
//# sourceMappingURL=signpdf.js.map