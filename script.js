// In-memory database to store users
const ubaDatabase = {
    users: {},
    loans: [],
};

//generating a unique account number
function generateAccountNumber() {
    return '2' + Math.floor(Math.random() * 1000000000);
}

// creating a new account
function createAccount() {
    const name = document.getElementById('createAccountName').value;
    if (name === '') {
        alert("Please enter a valid name");
        return;
    }

    const accountNumber = generateAccountNumber();
    ubaDatabase.users[accountNumber] = {
        name: name,
        balance: 0,
    };

    document.getElementById('accountInfo').innerHTML = `<p>Account created for ${name}. Account Number: ${accountNumber}</p>`;
    document.getElementById('createAccountName').value = '';  // to make the input field empty again
}

//to deposit money
function deposit() {
    const accountNumber = document.getElementById('depositAccount').value;
    const amount = parseFloat(document.getElementById('depositAmount').value);

    if (bankDatabase.users[accountNumber]) {
        bankDatabase.users[accountNumber].balance += amount;
        alert(`Successfully deposited ${amount}. New balance: ${bankDatabase.users[accountNumber].balance}`);
    } else {
        alert("Account not found!");
    }

    document.getElementById('depositAccount').value = '';
    document.getElementById('depositAmount').value = '';
}

//to transfer money between users
function transfer() {
    const fromAccount = document.getElementById('transferFromAccount').value;
    const toAccount = document.getElementById('transferToAccount').value;
    const amount = parseFloat(document.getElementById('transferAmount').value);

    if (!bankDatabase.users[fromAccount]) {
        alert("Sender account not found!");
        return;
    }
    if (!bankDatabase.users[toAccount]) {
        alert("Receiver account not found! Cannot transfer to non-user.");
        return;
    }

    if (bankDatabase.users[fromAccount].balance >= amount) {
        bankDatabase.users[fromAccount].balance -= amount;
        bankDatabase.users[toAccount].balance += amount;
        alert(`Transferred ${amount} from ${fromAccount} to ${toAccount}.`);
    } else {
        alert("Insufficient balance!");
    }

    document.getElementById('transferFromAccount').value = '';
    document.getElementById('transferToAccount').value = '';
    document.getElementById('transferAmount').value = '';
}

// to request a loan
function requestLoan() {
    const accountNumber = document.getElementById('loanAccount').value;
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);

    if (bankDatabase.users[accountNumber]) {
        const loanRequest = {
            accountNumber: accountNumber,
            loanAmount: loanAmount,
            status: "Pending",
        };
        bankDatabase.loans.push(loanRequest);
        alert(`Loan request for ${loanAmount} submitted by ${accountNumber}.`);
    } else {
        alert("Account not found!");
    }

    document.getElementById('loanAccount').value = '';
    document.getElementById('loanAmount').value = '';
}
