import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/Shared/employee.model';
import { EmployeeService } from 'src/app/Shared/employee.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  constructor(public employeeService:EmployeeService,public toast:ToastrService) { }
  @ViewChild('checkbox1') checkBox:ElementRef;
  isSlide:string='off';
  ngOnInit(): void {
    this.employeeService.getDesignation().subscribe(data=>
      {
        this.employeeService.listDesignation=data;
      });
    }

  submit(form:NgForm)
  {
    this.employeeService.employeeData.isMarried=form.value.isMarried==true?1:0;
    this.employeeService.employeeData.isActive=form.value.isActive==true?1:0;
    if(this.employeeService.employeeData.id==0)
    {
      this.insertEmployee(form);
    }
    else
    {
      this.updateEmployee(form);
    }
  }

  insertEmployee(myform:NgForm)
  {
    this.employeeService.saveEmployee().subscribe(d=>
      {
        this.resetForm(myform);
        this.employeeService.getEmployee().subscribe(
          res=>{
            this.employeeService.listEmployee=res;
          });
      });
      this.toast.success('Success','record Saved');
  }

  updateEmployee(myform:NgForm)
  {
    this.employeeService.updateEmployee().subscribe(d=>
      {
        this.resetForm(myform);
        this.employeeService.getEmployee().subscribe(
          res=>{
            this.employeeService.listEmployee=res;
          });
      });
      this.toast.warning('Success','record Updated');
  }

  resetForm(myform:NgForm)
  {
   myform.form.reset(myform.value);
   this.employeeService.employeeData=new Employee();
   this.hideShowSlide();
  }

  hideShowSlide()
  {
    if(this.checkBox.nativeElement.checked)
    {
      this.checkBox.nativeElement.checked=false;
      this.isSlide='off';
    }
  else
    {
      this.checkBox.nativeElement.checked=true;
      this.isSlide='on'; 
    }
  }
}
