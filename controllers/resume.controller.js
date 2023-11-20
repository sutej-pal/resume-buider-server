const { generatePDF, getPDFPrinter } = require("../helpers/template.helper");
const UserResource = require("../resources/user.resource");
const fs = require('fs');
const mongoose = require('mongoose');
const Resume = require('../models/resume');
var jsdom = require("jsdom");
var { JSDOM } = jsdom;
var { window } = new JSDOM("");
var htmlToPdfMake = require("html-to-pdfmake");

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

    static async generateResume(req, res) {
        try {
            let { id } = req.params;
            id = mongoose.Types.ObjectId(id);
            const data = req.body
            console.log('id =>', id);
            const resume = await Resume.findById(id);
            console.log(resume)

            const profile = htmlToPdfMake(resume.profile, {window:window});

            const resumeData = {
                content: [
                    resume.position,
                    profile,
                    'It\'s possible however to split any paragraph (or even the whole document) into columns.\n\n',
                    'Here we go with 2 star-sized columns, with justified text and gap set to 20:\n\n',
                ]
            };
            const printer = getPDFPrinter();
            const pdfDoc = printer.createPdfKitDocument(resumeData);

            // Pipe the PDF to the response
            pdfDoc.pipe(res);
            pdfDoc.end();
        } catch (error) {
            return res.json({ failed: true });
        }
    }

    static async create(req, res) {
        try {
            const resume = await Resume.create({});
            console.log(resume);
            return res.json({ message: 'Resume Created!' });
        } catch (error) {
            console.log(error);
            return res.json({ failed: true });
        }
    }

    static async update(req, res) {
        try {
            console.log(req);
            let { id } = req.params;
            const data = req.body;
            await Resume.findOneAndUpdate({ _id: id }, data, { new: true });
            return res.json({ message: 'Resume Updated!' });
        } catch (error) {
            console.log(error);
            return res.json({ failed: true });
        }
    }
}