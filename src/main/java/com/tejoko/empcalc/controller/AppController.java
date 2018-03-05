package com.tejoko.empcalc.controller;

import com.tejoko.empcalc.data.EmployeeDB;
import com.tejoko.empcalc.models.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    @RequestMapping("/findById{empId}")
    public @ResponseBody Employee findEmpByID (@PathVariable String empId){
        Employee foundEmployee=employeeDB.findEmpByID(empId);
        return foundEmployee;
    }
    @RequestMapping("/findByPos/{empPos}")
    public @ResponseBody List<Employee> findStudentById(@PathVariable String empPos){
        System.out.println("Find: " + empPos);
        Employee foundEmployee=employeeDB.findEmpByPos(empPos);
        List<Employee> foundArray=new ArrayList<>();
        foundArray.add(foundEmployee);
        System.out.println("foundArray: "+foundArray);
        return foundArray;
    }

    @RequestMapping("/")
    public String indexRte (){
        return "index";
    }
}
