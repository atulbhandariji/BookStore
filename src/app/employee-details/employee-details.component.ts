import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../Shared/employee.model';
import { EmployeeService } from '../Shared/employee.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(public empService:EmployeeService,public datepipe:DatePipe,public toast:ToastrService) { }
 @ViewChild(EmployeeFormComponent) emp:EmployeeFormComponent;
  ngOnInit(): void {
    this.empService.getEmployee().subscribe(data=>
      {
        debugger;
        this.empService.listEmployee=data;
      }
      );
    }
      populateEmployee(selectedEmployee:Employee)
      {
        console.log(selectedEmployee);
        let df=this.datepipe.transform(selectedEmployee.doj,'yyyy-MM-dd');
        selectedEmployee.doj=df;
        this.empService.employeeData=selectedEmployee;
        if(this.emp.isSlide='off')
        {
          this.emp.hideShowSlide();
        }
      }

      deleteEmployee(id:number)
      {
        if(confirm('Are you want to delete this records ?'))
        {
          this.empService.deleteEmployee(id).subscribe(data=>
            {
              console.log('record deleted...');
              this.empService.getEmployee().subscribe(data=>
                {
                  debugger;
                  this.empService.listEmployee=data;
                  this.toast.error('Success','record Saved');
                });
            },
            err=>{
              console.log('record not deleted...');
            });
        }
      }
}
