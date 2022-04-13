import * as fs from 'fs';
import PDFDocument from 'pdfkit';
import findByteRange from '../src/findByteRange';
import SignPdfError, {SignPdfErrorType} from '../src/SignPdfError';
// import plainAddPlaceholder from '../plainAddPlaceholder';

describe('findByteRange', () => {
    it('expects PDF to be Buffer', () => {
        try {
            findByteRange('non-buffer');
            expect('here').not.toBe('here');
        } catch (e) {
            expect(e instanceof SignPdfError).toBe(true);
            expect(e.type).toBe(SignPdfErrorType.INPUT);
        }
    });
    it('expects PDF to have a placeholder', () => {
        try {
            const pdf = new PDFDocument({
                autoFirstPage: true,
                size: 'A4',
                layout: 'portrait',
                bufferPages: true,
            });
            pdf.info.CreationDate = new Date();

            findByteRange(Buffer.from(pdf.toString()));
            expect('here').not.toBe('here');
        } catch (e) {
            expect(e instanceof SignPdfError).toBe(true);
            expect(e.type).toBe(SignPdfErrorType.PARSE);
        }
    });
    // it('expects to return correct byteRangeString and byteRange', async () => {
    //     try {
    //         let pdfBuffer = fs.readFileSync(`${__dirname}/../../../resources/no-annotations.pdf`);
    //         pdfBuffer = plainAddPlaceholder({
    //             pdfBuffer,
    //             reason: 'I have reviewed it.',
    //             signatureLength: 1612,
    //         });

    //         const {byteRangePlaceholder, byteRanges} = findByteRange(pdfBuffer);

    //         expect(byteRangePlaceholder).toBe('/ByteRange [0 /********** /********** /**********]');
    //         expect(byteRanges[0][0]).toBe('0');
    //         expect(byteRanges[0][1]).toBe('/**********');
    //         expect(byteRanges[0][2]).toBe('/**********');
    //         expect(byteRanges[0][3]).toBe('/**********');
    //     } catch (e) {
    //         expect('here').not.toBe('here');
    //     }
    // });
    it('expects byteRangePlaceholder to be undefined', async () => {
        try {
            const pdfBuffer = fs.readFileSync(`${__dirname}/../../../resources/signed.pdf`);
            const {byteRangePlaceholder} = findByteRange(pdfBuffer);

            expect(byteRangePlaceholder).toBe(undefined);
        } catch (e) {
            expect('here').not.toBe('here');
        }
    });
    it('expects byteRangeStrings to be pre-defined', async () => {
        try {
            const pdfBuffer = fs.readFileSync(`${__dirname}/../../../resources/signed.pdf`);
            const {byteRangeStrings} = findByteRange(pdfBuffer);
            expect(byteRangeStrings[0]).toBe('/ByteRange [0 153 3379 1275]');
        } catch (e) {
            expect('here').not.toBe('here');
        }
    });
});
