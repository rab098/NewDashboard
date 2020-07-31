import React, {useState, useEffect} from 'react';
import '../../assets/css/reportsCss.css';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import '../../ComponentsCss/GenerateReports.css'
import PdfMakeTable from "./PdfMakeTable";
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import DateFnsUtils from "@date-io/date-fns";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
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
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

// const ref = React.createRef();

let store = require("store");


const styles = {
    button: {
        marginTop: 20,
        marginRight: 20,
    },
    actionsContainer: {
        marginBottom: 20,
    },
    resetContainer: {
        padding: 20,

    },

    stepperBg:{
        backgroundColor: "transparent",
    },

    step:{
        color: "#008080"
    },
};

const useStyles = makeStyles(styles);

function GenerateReports(props) {

    const classes = useStyles();


    const [userData, setUserData] = useState(store.get("userData"));



    const [firstDate, setFirstDate] = useState();
    const [lastDate, setLastDate] = useState();

    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();

    const [enableToDatePicker,setEnableToDatePicker] = useState(true)

    const [activeStep, setActiveStep] = useState(0)
    const steps = getSteps()

    function getSteps() {
        return ['Select the dates', 'Choose the type of complaint', 'Select the supervisor'];
    }

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (<div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            defaultValue="20 Jul 2020"
                            id="date-picker-dialog"
                            label="From"
                            format="dd MMM yyyy"
                            error={false}
                            minDate={firstDate}
                            maxDate={lastDate}
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
                            error={false}
                            format="dd MMM yyyy"
                            minDate={fromDate + (24*60*60)}
                            maxDate={lastDate}
                            value={toDate}
                            onChange={handleToDateChange}
                            disabled = {enableToDatePicker}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            TextFieldComponent={TextFieldComponent}

                        />
                    </MuiPickersUtilsProvider>
                </div>)
            case 1:
                return (<div>

                </div>)
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'Unknown stepIndex';
        }
    }


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleFromDateChange = (date) => {
        setFromDate(date);
        setEnableToDatePicker(false)
    };


    const handleToDateChange = (date) => {
        setToDate(date);
    };


    // const handleDateClick = () => {
    //     if(fromDate === ""){
    //
    //     }
    // }

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
                    datesObj[i] = res.data[i].complain.createdAt






                    // Moment(res.data[i].complain.createdAt).format("DD MMM yyyy")
                }

                console.log("dates", datesObj)
                setFirstDate(datesObj[0])
                setLastDate(datesObj[datesObj.length - 1])
                setToDate(lastDate)

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

                    <Stepper className={classes.stepperBg} activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => (
                            <Step  key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    <Typography>{getStepContent(index)}</Typography>
                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                className={classes.button}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                            </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} className={classes.resetContainer}>
                            <Typography>All steps completed - you&apos;re finished</Typography>
                            <Button onClick={handleReset} className={classes.button}>
                                Reset
                            </Button>
                        </Paper>
                    )}



            </div>

            {/*<div>*/}
            {/*    <Button*/}
            {/*        disabled={activeStep === 0}*/}
            {/*        onClick={handleBack}*/}

            {/*    >*/}
            {/*        Back*/}
            {/*    </Button>*/}
            {/*    <Button variant="contained" color="primary" onClick={handleNext}>*/}
            {/*        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}*/}
            {/*    </Button>*/}
            {/*</div>*/}

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