const { generatePDF, getPDFPrinter } = require("../helpers/template.helper");
const UserResource = require("../resources/user.resource");
const fs = require('fs');
const Resume = require('../models/resume');
module.exports = class TemplateController {

    static async getProfile(req, res) {
        return res.json({
            user: new UserResource(req.user)
        });
    }


    static async getPDF(req, res) {
        try {
            const dd = {
                content: [
                    {
                        alignment: 'justify',
                        columns: [
                            {
                                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.'
                            }
                        ]
                    },
                ]
            };
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
            const printer = getPDFPrinter();
            const pdfDoc = printer.createPdfKitDocument(dd);

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
            return res.json({ failed: false });
        } catch (error) {
            console.log(error);
            return res.json({ failed: true });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            console.log('id =>', id);
            const resume = await Resume.findOneAndUpdate({ _id: id }, data, { new: true });
            console.log(resume)
            return res.json({ message: 'Updated', data: resume });
        } catch (error) {
            return res.json({ failed: true });
        }
    }
}