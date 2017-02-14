$(document).ready(function(){ // waits for DOM to completely load
  $('form').on('submit', function(event){ // event listener on form submission
    event.preventDefault(); // Do not bring us to a new page

    // Create an array of the inputs, the inputs are converted to objects
    // The objects have two properties, name and value
    // e.g. {name: 'firstName', value: 'Luke'}
    console.log('form values: ', $(this).serializeArray());

    var submissionArray = $(this).serializeArray(); // [{}, {}, {}]
    var newEmployeeObject = {}; // {firstName: 'Luke', lastName: 'Schlangen'}

    // submissionArray.forEach(function(inputFieldObject){
    //   // newEmployeeObject is {}
    //   newEmployeeObject[inputFieldObject.name] = inputFieldObject.value;
    //   // newEmployeeObject.firstName = Luke;
    //   // newEmployeeObject is {firstName: 'Luke'}
    //   // 2nd Time Through newEmployeeObject is {firstName: 'Luke', lastName: 'Schlangen'}
    // });

    for(var i = 0; i < submissionArray.length; i++){
      var inputFieldObject = submissionArray[i];
      newEmployeeObject[inputFieldObject.name] = inputFieldObject.value;
      // newEmployeeObject.firstName
      // newEmployeeObject['firstName']
    }

    console.log('New Employee Object: ', newEmployeeObject);

    // adds new employee row to DOM
    $('#employeeTableBody').append(
      '<tr>' +
        '<td>' + newEmployeeObject.firstName + '</td>' +
        '<td>' + newEmployeeObject.lastName + '</td>' +
        '<td>' + newEmployeeObject.idNumber + '</td>' +
        '<td>' + newEmployeeObject.jobTitle + '</td>' +
        '<td>' + newEmployeeObject.annualSalary + '</td>' +
        '<td><button class="deleteEmployeeButton" data-salary="' + newEmployeeObject.annualSalary + '">Delete ' + newEmployeeObject.firstName + '</button></td>' +
      '</tr>'
      );

    // Add monthly salary expenses to the DOM
    var newEmployeeMonthlyExpenses = annualSalary / 12;
    var previousMonthlyExpenses = $('#monthlyExpenses').text();
    var totalMonthlyExpenses = parseFloat(previousMonthlyExpenses) + newEmployeeMonthlyExpenses;
    $('#monthlyExpenses').text(totalMonthlyExpenses);

    // Clear out input boxes
    $('.employeeFormInput').val('');
  });

  // Adding listener for clicking delete employee buttons
  $('#employeeTableBody').on('click', '.deleteEmployeeButton', function(){
    // Removing employee salary from total
    var deletedEmployeeSalary = $(this).data('salary');
    var deletedEmployeeMonthlyExpenses = deletedEmployeeSalary / 12;
    var previousMonthlyExpenses = $('#monthlyExpenses').text();
    var newTotalMonthlyExpenses = previousMonthlyExpenses - deletedEmployeeMonthlyExpenses;
    $('#monthlyExpenses').text(newTotalMonthlyExpenses);

    // Selecting and deleting employee row from table
    $(this).parent().parent().remove();
  });
});
