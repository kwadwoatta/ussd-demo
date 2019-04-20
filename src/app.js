const app = require('express')();
const logger = require('morgan');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3030

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('*', (req, res) => {
    res.send('This is the demo USSD app');
});

app.post('*', (req, res) => {
    let { sessionId, serviceCode, phoneNumber, text } = req.body;
    if (text == '') {
        let response = (
            `CON What would you want to choose?
            1. My Account
            2. My Phone Number
            5. ${sessionId}
            6. ${serviceCode}`
        )
        res.send(response);
    }
    else if (text == '1') {
        let response = (
            `CON Choose account information you want to view
            1. Account Number
            2. Account Balance`
        )
        res.send(response);
    }
    else if (text == '2') {
        let response = (
            `END Your phone number is ${phoneNumber}`
        )
        res.send(response);
    }
    else if (text == '1*1') {
        let accountNumber = 'ACC1001';
        let response = `END Your account number is ${accountNumber}`
        res.send(response);
    }
    else if (text == '1*2') {
        let balance = 'GHC 20,000';
        let response = `END Your balance is ${balance}`;
        res.send(balance);
    }
    else {
        res.status(400).send('Bad request!');
    }
})

app.listen(port, () => {
    console.log(`Successfully running on port ${port}`);
})
