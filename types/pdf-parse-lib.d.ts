declare module "pdf-parse/lib/pdf-parse.js" {
    interface PDFInfo {
        [key: string]: unknown;
    }

    interface PDFData {
        text: string;
        numpages: number;
        numrender: number;
        info: PDFInfo;
        metadata: unknown;
        version: string;
    }

    interface PDFParseOptions {
        pagerender?: (pageData: unknown) => Promise<string>;
        max?: number;
        version?: string;
    }

    function pdfParse(dataBuffer: Buffer, options?: PDFParseOptions): Promise<PDFData>;

    export default pdfParse;
}