package com.tejoko.empcalc.controller;

import com.tejoko.empcalc.data.EmployeeDB;
import com.tejoko.empcalc.models.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
public class AppController {

    @Autowired
    private EmployeeDB employeeDB;

    @RequestMapping("/getallemployees")
    public @ResponseBody List<Employee> getAllEmployees(){
        return employeeDB.getAllEmployees();
    }
    @RequestMapping(value = "add/employee", method = RequestMethod.POST)
    public @ResponseBody Employee addEmployee (@RequestBody Map<String, Object> payload){
        String newEmpId=String.valueOf(payload.get("empId"));
        String newFName=String.valueOf(payload.get("empFName"));
        String newLName=String.valueOf(payload.get("empLName"));
        String newPos=String.valueOf(payload.get("empPos"));
        String newSalary=String.valueOf(payload.get("empSalary"));
        Employee newEmployee = new Employee(newEmpId, newFName, newLName, newPos, newSalary);
        employeeDB.addEmployee((newEmployee));
        return newEmployee;
    }
    @RequestMapping("/find/{empId}")
    public @ResponseBody Employee findEmpByID (@PathVariable String userInput){
        Employee foundEmployee=employeeDB.findEmpByID(userInput);
        return foundEmployee;
    }
    @RequestMapping("/find/{empPos}")
    public @ResponseBody Employee findEmpByPos (@PathVariable String userInput){
        Employee foundEmployee=employeeDB.findEmpByPos(userInput);
        return foundEmployee;
    }
    @RequestMapping("/")
    public String indexRte (){
        return "index";
    }
}
