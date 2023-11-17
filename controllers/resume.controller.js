const { generatePDF, getPDFPrinter } = require("../helpers/template.helper");
const UserResource = require("../resources/user.resource");
const fs = require('fs');

const dd = require('../templates/default.template');

module.exports = class ResumeController {


    static async getProfile(req, res) {
        return res.json({
            user: new UserResource(req.user)
        });
    }


    static async getPDF(req, res) {
        try {
            const printer = getPDFPrinter();
            const pdfDoc = printer.createPdfKitDocument(dd);

            // Pipe the PDF to the response
            pdfDoc.pipe(res);
            pdfDoc.end();
        } catch (error) {
            return res.json({ failed: true });
        }
    }
}