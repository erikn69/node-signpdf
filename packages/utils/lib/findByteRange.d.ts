declare const findByteRange: (pdf: any) => {
    byteRangePlaceholder: string;
    byteRangeStrings: RegExpMatchArray;
    byteRanges: RegExpMatchArray[];
};
export default findByteRange;
