import SignPdfError, {SignPdfErrorType} from '@signpdf/utils';
import getIndexFromRef from '../src/getIndexFromRef';

describe('getIndexFromRef', () => {
    it('Errors when ref is not found', () => {
        const refTable = {
            offsets: new Map(),
        };
        const ref = '50 0 R';

        try {
            getIndexFromRef(refTable, ref);
            expect('here').not.toBe('here');
        } catch (e) {
            expect(e instanceof SignPdfError).toBe(true);
            expect(e.type).toBe(SignPdfErrorType.PARSE);
            expect(e.message).toMatchSnapshot();
        }
    });
});
