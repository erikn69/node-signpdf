import {SignPdfError, SignPdfErrorType} from "@signpdf/utils";

/**
 * @param {object} refTable
 * @param {string} ref
 * @returns {number}
 */
const getIndexFromRef = (refTable, ref) => {
    let [index] = ref.split(' ');
    index = parseInt(index);

    if (!refTable.offsets.has(index)) {
        throw new SignPdfError(
            `Failed to locate object "${ref}".`,
            SignPdfErrorType.PARSE,
        );
    }
    return index;
};

export default getIndexFromRef;
