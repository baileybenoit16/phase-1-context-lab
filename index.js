// Function to create a single employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
        createTimeInEvent: createTimeInEvent,
        createTimeOutEvent: createTimeOutEvent,
        hoursWorkedOnDate: hoursWorkedOnDate,
        wagesEarnedOnDate: wagesEarnedOnDate,
        allWagesFor: allWagesFor
    };
}

// Function to create multiple employee records
function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

// Function to create a time-in event for an employee
function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
}

// Function to create a time-out event for an employee
function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(event => event.date === date);
    let timeOut = this.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(date) {
    let hours = this.hoursWorkedOnDate(date);
    return hours * this.payPerHour;
}

// Function to calculate all wages for an employee
function allWagesFor() {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date;
    });

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + this.wagesEarnedOnDate(d);
    }.bind(this), 0);

    return payable;
}

// Function to find an employee by their first name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

// Function to calculate payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => total + employee.allWagesFor(), 0);
}

// Export functions if necessary (e.g., for testing or module usage)
module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    findEmployeeByFirstName,
    calculatePayroll
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

