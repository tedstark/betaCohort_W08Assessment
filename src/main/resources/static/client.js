$(document).ready(function(){
    init()
});
function init() {
    enableButtons();
    getEmpRoster();
}
function enableButtons() {
    $("#btnAddEmp").on("click",addEmployee);
    // $("#btnIDSearch").on("click",findEmpById);
    // $("#btnPosSearch").on("click",findEmpByPos);
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