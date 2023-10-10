const pdfmake = require('pdfmake');

module.exports = {

    getPDFPrinter: () => {
        const fonts = {
            Roboto: {
                normal: 'node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf',
                bold: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',
                italics: 'node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf',
                bolditalics: 'node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf',
            },
        }
        return new pdfmake(fonts);
    },
    generatePDF: async () => {
        try {

            // Define font files
            var fonts = {
                Roboto: {
                    normal: 'fonts/Roboto-Regular.ttf',
                    bold: 'fonts/Roboto-Medium.ttf',
                    italics: 'fonts/Roboto-Italic.ttf',
                    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
                }
            };

            var PdfPrinter = require('pdfmake');
            var printer = new PdfPrinter(fonts);
            var fs = require('fs');

            var docDefinition = {
                // ...
            };

            var options = {
                // ...
            }

            var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
            // pdfDoc.pipe(fs.createWriteStream('document.pdf'));
            // pdfDoc.end();

            // Get the PDF stream as a buffer
            return pdfDoc.getBuffer((buffer) => {
                // Send the PDF as a response
                // res.setHeader('Content-Type', 'application/pdf');
                // res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
                return buffer;
            });


            // // Sample code for generating a PDF using PDFMake
            // var docDefinition = {
            //     content: [
            //         'Hello, this is a generated PDF document!',
            //         // Add more content based on your template and user input
            //     ],
            // };

            // return pdfMake.createPdf(docDefinition).getBlob((blob) => {
            //     // `blob` contains the PDF data
            //     // Now, you can proceed to send this blob to your API
            //     console.log('blob', blob);
            //     return blob
            // });
        } catch (error) {
            console.log('error', error);
        }
    }
}