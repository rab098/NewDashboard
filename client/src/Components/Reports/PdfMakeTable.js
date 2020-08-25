import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';
import Moment from "moment";

export default (reportObject) => {


    const {vfs} = vfsFonts.pdfMake;
    pdfMake.vfs = vfs;

    console.log(reportObject)


    let bodyData = [['ID', 'TYPE', 'DATE', 'PRIORITY', 'TOWN', 'SUPERVISOR', 'STATUS'],]
    let bodyDataForSupervisor = [['ID', 'TYPE', 'DATE', 'PRIORITY', 'TOWN', 'STATUS'],]


    if (reportObject.role === 'ADMIN') {
        reportObject.complaints.forEach(function (sourceRow) {
            let dataRow = [];

            dataRow.push(sourceRow.id);
            dataRow.push(sourceRow.type);
            dataRow.push(Moment(sourceRow.date).format('DD/MMM/YY'));
            dataRow.push(sourceRow.priority);
            dataRow.push(sourceRow.town);
            dataRow.push(sourceRow.supervisorName)
            dataRow.push(sourceRow.statusType)


            bodyData.push(dataRow)
        });
    } else {
        reportObject.complaints.forEach(function (sourceRow) {
            let dataRow = [];

            dataRow.push(sourceRow.id);
            dataRow.push(sourceRow.type);
            dataRow.push(Moment(sourceRow.date).format('DD/MMM/YY'));
            dataRow.push(sourceRow.priority);
            dataRow.push(sourceRow.town);
            dataRow.push(sourceRow.statusType)


            bodyDataForSupervisor.push(dataRow)
        });

    }


    console.log(bodyData)


    const documentDefinition = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        content: [
            {text: 'Sindh Solid Waste Management', bold: true, style: 'header', fontSize: 25, margin: [0, 10, 0, 5]},
            {
                text: reportObject.dateRadioValue === 'one' ? 'Report generated for ' + Moment(reportObject.dateOne).format('DD MMM YYYY') : 'Report generated from  ' + Moment(reportObject.dateFrom).format('DD/MMM/YYYY') + '  till  ' + Moment(reportObject.dateTo).format('DD/MMM/YYYY'),
                italics: true,
                fontSize: 9,
                margin: [0, 0, 0, 5],
                color: '#8E9397'
            },
            {text: 'Report Description', bold: true, fontSize: 12, margin: [0, 15, 0, 2]},
            {text: reportObject.description, bold: false, fontSize: 10, margin: [0, 0, 0, 10]},
            {
                style: 'tableExample',
                table: {
                    fontSize: 20,
                    borderTop: true,
                    bold: true,
                    body: reportObject.role === 'ADMIN' ? bodyData : bodyDataForSupervisor

                }
            },
        ]
    }

    pdfMake.createPdf(documentDefinition).open();
}