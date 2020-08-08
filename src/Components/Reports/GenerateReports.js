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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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

    stepperBg: {
        backgroundColor: "transparent",
    },

    step: {
        color: "#008080"
    },
};

const useStyles = makeStyles(styles);

function GenerateReports(props) {

    const classes = useStyles();


    const [userData, setUserData] = useState(store.get("userData"));


    const [firstDate, setFirstDate] = useState(null);
    const [lastDate, setLastDate] = useState(null);

    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [oneDate, setOneDate] = useState(null);


    const [enableToDatePicker, setEnableToDatePicker] = useState(true)

    const [activeStep, setActiveStep] = useState(0)

    const [nextButton, setNextButton] = useState(true)

    const [mainData, setMainData] = useState([])

    const [reportData, setReportData] = useState([])

    const [radioValue, setRadioValue] = useState('one');

    const [hideOne, setHideOne] = useState(false);

    const [hideMultiple, setHideMultiple] = useState(true);


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
        let mainObj = []

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

                    let tmpObj = {};
                    tmpObj["id"] = res.data[i].complain.id;
                    tmpObj["description"] = res.data[i].complain.description;
                    tmpObj["longitude"] = res.data[i].complain.Location.longitude;
                    tmpObj["latitude"] = res.data[i].complain.Location.latitude;
                    tmpObj["image"] = res.data[i].complain.image;
                    tmpObj["afterImage"] = res.data[i].complain.resolvedComplaintImage;
                    tmpObj["statusType"] = res.data[i].complain.Status.statusType;
                    tmpObj["statusId"] = res.data[i].complain.Status.id;
                    tmpObj["date"] = res.data[i].complain.createdAt;
                    tmpObj["town"] = res.data[i].complain.Location.town.name;
                    tmpObj["priority"] =
                        res.data[i].complain.noOfRequests > 5
                            ? "high"
                            : res.data[i].complain.noOfRequests > 1
                            ? "medium"
                            : "low";

                    tmpObj["reason"] =
                        res.data[i].complain.Status.statusType === "Rejected"
                            ? res.data[i].complain.reasonForRejection
                            : "";
                    tmpObj["requests"] = res.data[i].complain.noOfRequests;

                    tmpObj["type"] = res.data[i].complain.ComplaintType.typeName;
                    tmpObj["supervisorId"] = res.data[i].complain.assignedTo;

                    tmpObj["supervisorName"] =
                        res.data[i].complain.User && res.data[i].complain.User.name;
                    tmpObj["otherStatus"] = res.data[i].supervisorStatus
                        ? res.data[i].supervisorStatus
                        : res.data[i].adminStatus;
                    mainObj.push(tmpObj);

                    // mainObj[i] = res.data[i]
                    // Moment(res.data[i].complain.createdAt).format("DD MMM yyyy")
                }


                console.log("what data is coming of complaints?", mainObj)
                console.log("dates", datesObj)
                setFirstDate(datesObj[0])
                setLastDate(datesObj[datesObj.length - 1])
                setToDate(lastDate)
                setReportData(mainObj)
                setMainData(mainObj)

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


    const steps = getSteps()

    function getSteps() {
        return ['Select the dates', 'Choose the type of complaint', 'Select the supervisor'];
    }

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (<div>

                    <FormControl component="fieldset">
                        <FormLabel component="legend">You can choose to generate a one day or a multiple days
                            report.</FormLabel>
                        <RadioGroup
                            row
                            aria-label="position"
                            name="position"
                            defaultValue="one"
                            onChange={handleRadioChange}>

                            <FormControlLabel
                                value="one"
                                control={<Radio color="primary"/>}
                                label="One day"
                                labelPlacement="end"/>
                            <FormControlLabel
                                value="multiple"
                                control={<Radio color="primary"/>}
                                label="Multiple Days"
                                labelPlacement="end"/>

                        </RadioGroup>
                    </FormControl>

                    {hideOne ?
                        <div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    defaultValue="20 Jul 2020"
                                    id="date-picker-dialog-from"
                                    label="From"
                                    format="dd MMM yyyy"
                                    error={false}
                                    minDate={firstDate}
                                    maxDate={Moment(lastDate).add(-1, "days")}
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
                                    id="date-picker-dialog-to"
                                    label="To"
                                    error={false}
                                    format="dd MMM yyyy"
                                    minDate={Moment(fromDate).add(1, "days")}
                                    maxDate={lastDate}
                                    value={toDate}
                                    onChange={handleToDateChange}
                                    disabled={enableToDatePicker}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    TextFieldComponent={TextFieldComponent}

                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        :

                        <div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    defaultValue="20 Jul 2020"
                                    id="date-picker-dialog-one"
                                    label="Select Date"
                                    format="dd MMM yyyy"
                                    error={false}
                                    minDate={firstDate}
                                    maxDate={lastDate}
                                    value={oneDate}
                                    onChange={handleOneDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    TextFieldComponent={TextFieldComponent}

                                />
                            </MuiPickersUtilsProvider>
                        </div>
                    }


                </div>)
            case 1:
                return (<div>
                    <p>something!!</p>
                </div>)
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'Unknown stepIndex';
        }
    }


    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
        setHideOne((prev) => !prev);


        // if (radioValue === 'multiple') {
        //     setHideOne(true)
        // } else {
        //     setHideOne(false)
        //
        // }


    };


    const handleOneDateChange = (date) => {
        setOneDate(date);
    };

    const handleFromDateChange = (date) => {
        setFromDate(date);
        setEnableToDatePicker(false)
    };


    const handleToDateChange = (date) => {
        setToDate(date);
        setNextButton(false)
    };

    const handleNext = () => {

        if (radioValue === 'one') {
            if (oneDate !== null) {
                setReportData(
                    mainData.filter(
                        (obj) =>
                            Moment(obj.date).format("DD MMM yyyy") === Moment(oneDate).format("DD MMM yyyy")
                    )
                )

                setActiveStep((prevActiveStep) => prevActiveStep + 1);

            }
        } else {
            if (fromDate !== null && toDate !== null) {

                console.log("from????data", Moment(fromDate).format("DD MMM yyyy"))
                setReportData(
                    mainData.filter(
                        (obj) =>
                            // console.log("obj date?", Moment(obj.date).format("DD MMM yyyy"))
                            Moment(obj.date).format("DD MMM yyyy") >= Moment(fromDate).format("DD MMM yyyy") &&
                            Moment(obj.date).format("DD MMM yyyy") <= Moment(toDate).format("DD MMM yyyy")
                        // obj.statusType === "Resolved" || obj.statusType === "Rejected"
                    )
                )
                setActiveStep((prevActiveStep) => prevActiveStep + 1);


            }
        }


    };

    console.log("reportData?", reportData)


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
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
                        <Step key={label}>
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
                                            disabled={nextButton}
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