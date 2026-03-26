const express = require('express')
app = express()

const cors = require("cors")

var url = require('url');
var dt = require('./date-time');

const port = process.env.PORT || 3000
const majorVersion = 1
const minorVersion = 3

app.use(express.static(__dirname + '/static'))
app.use(cors({ origin: '*' }))

app.get('/calculate-bmi', (request, response) => {
    console.log('Calling "/calculate-bmi" on the Node.js server.');
    let { feet, inches, lbs, systolic, diastolic } = request.query;
    let heightFeet = parseInt(feet);
    let heightInches = parseInt(inches);
    let weight = parseInt(lbs);
    let systolicNum = parseInt(systolic);
    let diastolicNum = parseInt(diastolic);



    console.log('Height:' + heightFeet + '\'' + heightInches + '\'')
    console.log("Weight (lbs):", weight)

    // Todo: Implement unit conversions and BMI calculations.
    let totalHeightInches = (heightFeet * 12) + heightInches;

    let bmi = 0
    bmi = ((weight) / ((totalHeightInches) ** 2)) * 703;
    // Todo: Return BMI instead of Todo message.
    console.log("BMI:", bmi)

    let bloodPressure;

    if (systolicNum == 5 || diastolicNum == 4){
        bloodPressure = "Crisis";
    } else if (systolicNum == 4 || diastolicNum == 3){
        bloodPressure = "Stage 2";
    } else if (systolicNum == 3 || diastolicNum == 2){
        bloodPressure = "Stage 1";
    } else if (systolicNum == 2 && diastolicNum == 1){
        bloodPressure = "Elevated";
    } else if (systolicNum == 1 && diastolicNum == 1){
        bloodPressure = "Normal";
    }

    response.type('text/plain')
    response.send(bmi.toFixed(2))
})

app.listen(port, () => console.log(
    `Express started at \"http://localhost:${port}\"\n` +
    `press Ctrl-C to terminate.`)
)