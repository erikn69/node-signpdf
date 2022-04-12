export declare enum SignPdfErrorType {
    UNKNOWN = "UNKNOWN",
    INPUT = "INPUT",
    PARSE = "PARSE"
}
declare class SignPdfError extends Error {
    type: SignPdfErrorType;
    constructor(msg: any, type?: SignPdfErrorType);
}
export default SignPdfError;
