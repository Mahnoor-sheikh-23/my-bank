#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.italic.bold.rgb(135, 206, 250)(`\n\t\t\t^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n\t\t\t\t~~~~~~~~~~~~~~~ WELL COME BACK  TO MY BANK ~~~~~~~~~~~~~~~ \n\t\t\t^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n`));
console.log(chalk.italic.bold.rgb(229, 191, 145)(`\t\t\t     To Access Your Account Firstly You Have To Give Us Your Information\n`));
// first class 
class customers {
    first_name;
    last_name;
    age;
    gender;
    mobilenumber;
    id;
    constructor() {
        this.first_name = "";
        this.last_name = "";
        this.age = 0;
        this.gender = "";
        this.mobilenumber = 0;
        this.id = this.pininfo();
    }
    // generating random pin code 
    pininfo() {
        return Math.floor(Math.random() * 100000);
    }
    // all ingormation collected here 
    customerInfo(name, fname, age, gender, mobile) {
        return chalk.italic.rgb(255, 218, 185)(`\n        Name : ${name} ${fname}
        Age : ${age}
        Gender : ${gender}
        Mobile Number : ${mobile}
        Pin code : ${this.id}
        
       `);
    }
}
// call the class 
let custom = new customers();
// another class
class BankAccount {
    debit;
    credit;
    accouuntBalance;
    constructor() {
        this.debit = "";
        this.credit = "";
        this.accouuntBalance = 100;
    }
    // class method
    debbit(pin, amount) {
        let check = custom.id == pin;
        if (!check) {
            console.log(chalk.italic.rgb(300, 0, 70)("Your PIN CODE  is incorrect"));
        }
        else {
            let statement = "Sorry ! you have unsufficient balance ";
            if (amount > 0) {
                statement = chalk.italic.rgb(255, 182, 193)("The Amount You Entered Is Wrong !!");
                if (this.accouuntBalance > amount) {
                    this.accouuntBalance -= amount;
                    statement = chalk.italic.rgb(255, 182, 193)(`Transaction sucessfull ! new account Balance is  ${this.accouuntBalance}`);
                }
                else {
                    statement = chalk.italic.rgb(300, 0, 70)("\nYou dont have enough money to do this transaction ");
                }
                console.log(statement);
            }
        }
    }
    // class second method
    creedit(pin, amount) {
        let check = custom.id == pin;
        if (!check) {
            console.log(chalk.italic.rgb(300, 0, 70)("Your ID is Incorrect"));
        }
        else {
            let statement = "Transaction Failed ";
            if (amount > 0) {
                this.accouuntBalance += amount;
                if (amount > 100) {
                    this.accouuntBalance -= 1;
                    statement = chalk.italic.rgb(255, 182, 193)("\nYour Account has been credited successfully. 1 rupee deducted due to exceeding 100 rupees \n");
                }
                else {
                    statement = chalk.italic.rgb(255, 182, 193)("\nYour Account has been credited sucessfully\n ");
                }
                console.log(statement);
            }
        }
    }
    // class third method
    showBalance() {
        return this.accouuntBalance;
    }
}
// cal the class
let bank = new BankAccount();
// function to take input from the user 
async function getinput() {
    let questions = await inquirer.prompt([{
            name: "names",
            type: "input",
            message: chalk.italic.rgb(75, 0, 130)("Please Enter Your First Name : "),
            validate: (input) => /^[A-Za-z\s]+$/.test(input) ? true : "Please enter only Alphabetic words"
        }, {
            name: "last",
            type: "input",
            message: chalk.italic.rgb(75, 0, 130)("Please Enter Your Last Name : "),
            validate: (input) => /^[A-Za-z\s]+$/.test(input) ? true : "Please enter only Alphabetic words"
        }, {
            name: "age",
            type: "input",
            message: chalk.italic.rgb(75, 0, 130)("Please Enter Your Age : "),
            validate: (input) => {
                if (input.trim() === "") {
                    return 'Age can not be empty';
                }
                const number = parseInt(input);
                if (isNaN(number)) {
                    return "Please enter numerical value ";
                }
                else if (!/^\d+$/.test(input)) {
                    return 'Please enter only numerical value';
                }
                return true;
            }
        }, {
            name: "gender",
            type: "list",
            message: chalk.italic.rgb(75, 0, 130)("Please select Your Gender : "),
            choices: ["Male", "Female"]
        }, {
            name: "mobile",
            type: "input",
            message: chalk.italic.rgb(75, 0, 130)("Please Enter Your Mobile Number : "),
            validate: (input) => {
                if (input.trim() === "") {
                    return 'Number can not be empty';
                }
                const number = parseInt(input);
                if (!/^\d+$/.test(input)) {
                    return 'Please enter only numerical value';
                }
                else if (input.length !== 11) {
                    return "Please enter 11 numerical digits ";
                }
                else
                    return true;
            }
        }]).then((responce) => {
        // here we call our class first method
        let user = custom.customerInfo(responce.names, responce.last, responce.age, responce.gender, responce.mobile);
        console.log(user);
        custom.pininfo();
    });
}
//  second function 
async function getamount() {
    await getinput();
    let running = true; //loop for ask again and again 
    while (running) {
        let user_amount = await inquirer.prompt([{
                name: "check",
                type: "list",
                message: chalk.italic.rgb(75, 0, 130)("what would you like to choose"),
                choices: ["credit", "debit", "Show balance", "Exit"] //choices what do you want to do 
            }]);
        if (user_amount.check == "credit") {
            let ask = await inquirer.prompt([{
                    name: "pin",
                    type: "number",
                    message: chalk.italic.rgb(75, 0, 130)("Enter the Pin Code : "),
                }]);
            let debait = await inquirer.prompt({
                name: "amount",
                type: "number",
                message: chalk.italic.rgb(75, 0, 130)("Enter the amount :"),
            });
            let inp = ask.pin;
            bank.creedit(inp, debait.amount);
            console.log(chalk.italic.rgb(0, 200, 0)(` The Current Balance is : ${bank.showBalance()}\n`));
        }
        else if (user_amount.check == "debit") {
            let ask = await inquirer.prompt([{
                    name: "pin",
                    type: "number",
                    message: chalk.italic.rgb(75, 0, 130)("Enter the Pin Code :"),
                }]);
            let debait = await inquirer.prompt({
                name: "amount",
                type: "number",
                message: chalk.italic.rgb(75, 0, 130)("Enter the amount : "),
            });
            let input = ask.pin;
            bank.debbit(input, debait.amount);
            console.log(chalk.italic.rgb(0, 200, 0)(`\n The Current Balance is : ${bank.showBalance()}\n`)); //showing user balance also 
        }
        else if (user_amount.check == "Show balance") {
            console.log(chalk.italic.bold.rgb(0, 200, 0)(`\n In Your Account  The Current Balance is : ${bank.showBalance()}\n`));
        }
        else if (user_amount.check == "Exit") {
            console.log(chalk.italic.bold.rgb(220, 20, 60)("\nExicting From Your Account..."));
            console.log(chalk.italic.bold.rgb(26, 267, 228)("\n\t\t\t^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n\t\t\t\t\t Thank You FOR BEING A PART OF MY BANK\n\t\t\t^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n "));
            process.exit();
        }
    }
}
// call the function
getamount();
