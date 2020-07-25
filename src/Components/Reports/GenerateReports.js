import React, {useState, useEffect} from 'react';
import '../../assets/css/reportsCss.css';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import '../../ComponentsCss/GenerateReports.css'
import PdfMakeTable from "./PdfMakeTable";
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import DateFnsUtils from "@date-io/date-fns";
import Moment from "moment";

// import MomentUtils from '@date-io/moment';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

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
import axios from "axios";

// const ref = React.createRef();

let store = require("store");

function GenerateReports(props) {

    const [userData, setUserData] = useState(store.get("userData"));

    const [fromDate, setFromDate] = useState(Moment());
    const [toDate, setToDate] = useState(Moment());

    const [firstDate, setFirstDate] = useState([]);



    const handleFromDateChange = (date) => {
        setFromDate(date);
    };


    const handleToDateChange = (date) => {
        setToDate(date);
    };

    const TextFieldComponent = (props) => {
        return <TextField {...props} disabled={true}/>
    }
    const [reportType, setReportType] = React.useState('Total Complaints Yearly');
    const [pageSize, setPageSize] = React.useState('A4');

    const [resume, setResume] = useState({})

    const handleChange = (event) => {
        setReportType(event.target.value);

        if (reportType === 'Total Complaints Yearly') {
            console.log('display totals report')
        }
    };

    const handlePageSize = (event) => {
        setPageSize(event.target.value)

        if (pageSize === 'A4') {

        } else if (pageSize === 'Letter') {

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

    const headers = {
        "Content-Type": "application/json",
        "x-access-token": userData.accessToken,
    };


    const getComplaints = () => {

        let datesObj = [];

        axios
            .get(
                `https://m2r31169.herokuapp.com/api/getComplaints`,

                {
                    headers: headers,
                }
            )
            .then((res) => {
                console.log("complaints coming!", res.data);
                for (let i in res.data) {
                    datesObj[i] = Moment(res.data[i].complain.createdAt)
                }

                console.log("dates", datesObj)
                // setFirstDate(datesObj)

                })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 401 || err.response.status === 403) {
                        handleLogoutAutomatically();
                    }
                }

                console.log("complaints not coming", err.response);


            });
    }

    const getSupervisor = () => {

        axios.get(`https://m2r31169.herokuapp.com/api/getSuperVisor_Town`,
            {
                headers: headers
            })
            .then((res) => {
                console.log("supervisor and town coming!", res.data);

            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 401 || err.response.status === 403) {
                        handleLogoutAutomatically();
                    }
                }

                console.log("supervisor and towns not coming", err.response);


            })
    }


    useEffect(() => {
        // console.log("userData" + JSON.stringify(userData));
        getComplaints()
        getSupervisor()
        // setComplaintFilter("active");
    }, [userData]);

    const handleLogoutAutomatically = () => {
        store.remove("userData");
        store.clearAll();
        setUserData({});
        window.location = "/";
    };


    return (
        <div>

            <div className="report-filter-main">

                <p className="report-heading">Generate Report</p>


                {/*<div className="report-filter">*/}
                {/*    <button className='report-pdf-button' onClick={_exportPdfTable}>*/}
                {/*        Download Report*/}
                {/*    </button>*/}
                {/*</div>*/}

                {/*<button className='report-pdf-button' onClick={exportPDF}>Download PDF</button>*/}


            </div>

            <div>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="From"
                        format="dd MMM yyyy"
                        value={fromDate}
                        onChange={handleFromDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        TextFieldComponent={TextFieldComponent}

                    />
                </MuiPickersUtilsProvider>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="To"
                        format="dd MMM yyyy"
                        value={toDate}
                        onChange={handleToDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        TextFieldComponent={TextFieldComponent}

                    />
                </MuiPickersUtilsProvider>
            </div>


            {/*<div className="report-filter-main-pdf">*/}
            {/*    <header >*/}
            {/*        <h1 >Report Heading</h1>*/}
            {/*        <p>                    Date: Day-Month-Year*/}
            {/*        </p>*/}
            {/*    </header>*/}
            {/*    <h6>Report Description</h6>*/}
            {/*    <p>*/}
            {/*        Content goes here*/}
            {/*    </p>*/}

            {/*</div>*/}
        </div>
    )
}

export default GenerateReports;