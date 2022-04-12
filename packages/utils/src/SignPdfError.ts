export enum SignPdfErrorType {
    UNKNOWN = 'UNKNOWN',
    INPUT = 'INPUT',
    PARSE = 'PARSE'
}

class SignPdfError extends Error {
    type: SignPdfErrorType

    constructor(msg, type = SignPdfErrorType.UNKNOWN) {
        super(msg);
        this.type = type;
    }
}

export default SignPdfError;
