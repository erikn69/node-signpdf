import SignPdfError, {SignPdfErrorType} from '../src/SignPdfError';

describe('SignPdfError', () => {
    it('SignPdfError extends Error', () => {
        const instance = new SignPdfError('Whatever message');
        expect(instance instanceof Error).toBe(true);
    });
    it('type defaults to UNKNOWN', () => {
        const instance = new SignPdfError('Whatever message');
        expect(instance.type).toBe(SignPdfErrorType.UNKNOWN);
    });
    it('type can be specified', () => {
        [
            SignPdfErrorType.UNKNOWN,
            SignPdfErrorType.INPUT,
            SignPdfErrorType.PARSE,
        ].forEach((type) => {
            const instance = new SignPdfError('Whatever message', type);
            expect(instance.type).toBe(type);
        });
    });
});
