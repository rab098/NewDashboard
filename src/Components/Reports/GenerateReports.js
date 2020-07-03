import React, {useState, useEffect} from 'react';
import '../../assets/css/reportsCss.css';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import '../../ComponentsCss/GenerateReports.css'
import PdfMakeTable from "./PdfMakeTable";
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import {
    PDFDocument,
    PDFText,
    PDFTable,
    PDFTableRow,
    PDFTableColumn,
    PDFColumns,
    PDFColumn
} from 'react-pdfmake';

// const ref = React.createRef();

function GenerateReports(props) {

    const [reportType, setReportType] = React.useState('Total Complaints Yearly');
    const [pageSize, setPageSize] = React.useState('A4');

    const [resume,setResume] = useState({})

    const handleChange = (event) => {
        setReportType(event.target.value);

        if(reportType === 'Total Complaints Yearly'){
            console.log('display totals report')
        }
    };

    const handlePageSize = (event) =>{
        setPageSize(event.target.value)

        if(pageSize === 'A4'){

        }

        else if (pageSize === 'Letter'){

        }
    }

   const _exportPdfTable = () => {
        // change this number to generate more or less rows of data
        PdfMakeTable(20);
    }

   // const exportPDF = () => {
   //      resume.save();
   //  }


    // const exportPDF = () => {
    //     html2canvas(document.querySelector("#capture")).then(canvas => {
    //         document.body.appendChild(canvas);  // if you want see your screenshot in body.
    //         const imgData = canvas.toDataURL('image/png');
    //         const pdf =  jsPDF();
    //         pdf.addImage(imgData, 'PNG', 0, 0);
    //         pdf.save("report.pdf");
    //     });
    // }

    return (
        <div>

            <div className="report-filter-main">
                <div className="report-filter">
                <p>Generate Report on: </p>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={reportType}
                    onChange={handleChange}
                >
                    <MenuItem value='Total Complaints Yearly'>Total Complaints Yearly</MenuItem>
                    <MenuItem value='Total Complaints Monthly'>Total Complaints Monthly</MenuItem>
                    <MenuItem value='Total Complaints Daily'>Total Complaints Daily</MenuItem>
                </Select>
                </div>

                <div className="report-filter">
                    <button className='report-pdf-button' onClick={_exportPdfTable}>
                        Download Report
                    </button>
                </div>

                {/*<button className='report-pdf-button' onClick={exportPDF}>Download PDF</button>*/}


            </div>

            <div className="report-filter-main-pdf">
                <header >
                    <h1 >Report Heading</h1>
                    <p>                    Date: Day-Month-Year
                    </p>
                </header>
                <h6>Report Description</h6>
                <p>
                    Content goes here
                </p>

            </div>
        </div>
    )
}

export default GenerateReports;