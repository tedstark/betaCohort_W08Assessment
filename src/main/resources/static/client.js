$(document).ready(function(){
    init()
});
function init() {
    enableButtons();
    getEmpRoster();
}
function enableButtons() {
    $("#btnAddEmp").on("click",addEmployee);
    $("#btnIDSearch").on("click",findEmpById);
    $("#btnPosSearch").on("click",findEmpByPos);
}
function addEmployee() {
    event.preventDefault();
    var formId=$("#idEntry").val();
    var formFName=$("#fNameEntry").val();
    var formLName=$("#lNameEntry").val();
    var formSalary=$("#salaryEntry").val();
    var formPos=$("#posEntry").val();
    var newEmployee= {
        empId: formId,
        empFName: formFName,
        empLName: formLName,
        empSalary: formSalary,
        empPos: formPos
    };
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        data: JSON.stringify(newEmployee),
        url: "add/employee",
        success: function(serverData){
            getEmpRoster()
        }
    });
}
function getEmpRoster() {
    $.ajax({
        type: "GET",
        url: "/getallemployees",
        success: function(serverData){
            appendRoster(serverData)
        }
    })
}
function appendRoster(roster) {
    $("#dispAllEmp").empty();
    for(var i=0; i<roster.length; i++){
        var employee=roster[i];
        $("#dispAllEmp").append("<div></div>");
        var el = $("#dispAllEmp").children().last();
        el.append("<p>" + employee.empId+" - "+
            employee.empFName+" "+
            employee.empLName+" "+
            employee.empPos+" "+
            employee.empSalary+"</p>");
    }
}
function findEmpById() {
    event.preventDefault();
    if (($("#empIDSearch").val()) == "") {
        $("#dispResults").text("Enter an Employee ID to Search!");
    } else {
        var empID = $("#empIDSearch").val();
        $.ajax({
            type: "GET",
            url: "/findById/"+empID,
            success: function(fndEmployee){
                dispEmpById(fndEmployee);
            }
        })
    }

}
function dispEmpById(employee) {
    $("#dispResults").empty();
    $("#dispResults").append("<div></div>");
    var el = $("#dispResults").children().last();
    el.append("<p>" + employee.empId+" - "+
        employee.empFName+" "+
        employee.empLName+" "+
        employee.empPos+" "+
        employee.empSalary+"</p>");
}
function findEmpByPos() {
    event.preventDefault();
    if (($("#empPosSearch").val()) == "") {
        $("#dispResults").text("Choose an Employee Position to Search!");
    } else {
        var empPos = $("#empPosSearch").val();
        console.log("Find all "+empPos)
        $.ajax({
            type: "GET",
            url: "/findByPos/"+empPos,
            success: function(fndEmployees){
                console.log("Found em!");
                dispEmpByPos(fndEmployees);
            }
        });
    }
}
function dispEmpByPos(employees) {
    $("#dispResults").empty();
    $("#dispResults").append("<div></div>");
    var el = $("#dispResults").children().last();
    el.append("<p>" + employees.empId+" - "+
        employees.empFName+" "+
        employees.empLName+" "+
        employees.empPos+" "+
        employees.empSalary+"</p>");
    }
