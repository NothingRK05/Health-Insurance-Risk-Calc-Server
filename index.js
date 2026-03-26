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
    console.log('Calling "/calculate-bmi" on the Node.js server.')
    let { feet, inches, lbs } = request.query
    let heightFeet = parseInt(feet)
    let heightInches = parseInt(inches)
    let weight = parseInt(lbs)


    console.log('Height:' + heightFeet + '\'' + heightInches + '\'')
    console.log("Weight (lbs):", weight)

    // Todo: Implement unit conversions and BMI calculations.
    let totalHeightInches = (heightFeet * 12) + heightInches;

    let bmi = 0
    bmi = ((weight) / ((totalHeightInches) ** 2)) * 703;
    // Todo: Return BMI instead of Todo message.
    console.log("BMI:", bmi)


    response.type('text/plain')
    response.send(bmi.toFixed(2))
})

app.get('/calculate-risk', (request, response) => {
    console.log('Calling "/calculate-risk" on the Node.js server.')

    let { age, bmi, systolic, diastolic, disease } = request.query

    let risk = 0

    let userAge = parseInt(age)
    if (userAge < 30) risk += 0
    else if (userAge < 45) risk += 10
    else if (userAge < 60) risk += 20
    else risk += 30

    let userBMI = parseFloat(bmi)
    if (userBMI < 25) risk += 0
    else if (userBMI < 30) risk += 30
    else risk += 75

    let sys = parseInt(systolic)
    let dia = parseInt(diastolic)

    if (sys > 180 || dia > 120) risk += 100
    else if (sys >= 140 || dia >= 90) risk += 75
    else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) risk += 30
    else if (sys >= 120 && sys <= 129 && dia < 80) risk += 15

    if (disease === "diabetes") risk += 10
    else if (disease === "cancer") risk += 10
    else if (disease === "alzheimers") risk += 10

    let level = "Low"
    if (risk >= 50) level = "Moderate"
    if (risk >= 100) level = "High"
    if (risk >= 150) level = "Very High"

    response.json({
        totalRisk: risk,
        riskLevel: level
    })
})
app.listen(port, () => console.log(
    `Express started at \"http://localhost:${port}\"\n` +
    `press Ctrl-C to terminate.`)
)