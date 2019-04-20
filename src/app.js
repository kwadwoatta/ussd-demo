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

    let firstOutput = () => {
        if (text == '') {
            let response = (
                `CON Block Momo, 
                Choose an option below:
                1. Create Account
                2. Transfer Money
                3. Check Balance
                4. View Transactions`
            )
            res.send(response);
        }
    }
    
    let secondOutput = () => {
        if (text === '1') {
            let response = (
                `CON 1. Enter pin to create account`
            )
            res.send(response);
        }
        else if (text === '2') {
            let response = (
                `CON 1. Enter recipient's number`
            )
            res.send(response);
        }
        else if (text === '3') {
            let response = (
                `CON 1. Enter your account pin to check balance`
            )
            res.send(response);
        }
        else if (text === '4') {
            let response = (
                `END 1. Transactions`
            )
            res.send(response);
        }
    }



    let thirdOutput = () => {
        //  UNDER CREATING ACCOUNT
        if (/^('1*')/.test('text').toString() && text.length === 6) {
        // if (/^('1*')/.test('text').toString() && (/^(\w+\s?){2,2}/).test(text.slice(2))) { // tests if text starts with 1* and it's slice contains two words
            let slicedPin = text.slice(2);
            let response = (
                `END Account created successfully, pin: 
                ${slicedPin}`
            )
            console.log("text: " + text)
            console.log("slicedPin: " + slicedPin)
            res.send(response);
        }

        //  UNDER TRANSFERRING MONEY 
        else if (/^('2*')/.test('text').toString() && text.length === 12) {
            let slicedNumber = text.slice(2);
            console.log(text)
            let response = (
                `CON You're sending money to ${slicedNumber}
                1. Enter amount to send`
            )
            console.log("text: " + text)
            console.log("slicedNumber: " + slicedNumber)
            res.send(response);
        }

    // UNDER CHECKING BALANCE
        else if (/^('3*')/.test('text').toString() && text.length === 7) {
            let balance = 'GHC 20,000';
            let slicedPin = text.slice(2);
            let response = (
                `END You entered pin: 
                ${slicedPin}
                Your balance is:
                ${balance}`
            )
            console.log("text: " + text)
            console.log("slicedPin: " + slicedPin)
            res.send(response);
        }

        fourthOutput = () => {
            //  UNDER TRANSFERRING MONEY 
            // step 4
            if (/^(21*)/.test('text') && typeof text === "string") {
                let amount = text.slice(2).toFixed(2);
                let response = (
                    `CON You're sending GH₵${amount}
                    1. Confirm`
                )
                console.log("text: " + text)
                console.log("slicedNumber: " + slicedNumber)
                res.send(response);
            }
        };
    }

firstOutput();
secondOutput();
thirdOutput();
fourthOutput();
})



app.listen(port, () => {
    console.log(`Successfully running on port ${port}`);
})
