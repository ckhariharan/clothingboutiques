import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { AdminService } from 'src/app/services/admin.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';


export class employee {
  id!: any;
  Name!: string;
  Phone!: string;
  Section!: string;
  Salary!: string;
  EID!: string;
}


@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  deliveryData :any;

  date = new Date();

  formattedDate = this.date.toLocaleDateString('en-GB');

  
  showDialog: boolean = false;
  showTextBox: boolean = false;
  isButtonDisabled: boolean = false;
  selectedUser: any | null = null;

  Name: string = '';
  Phone: string = '';
  Section: string = '';
  Salary: string = '';
  EID: string = '';

  Gender: string = '';
  showError: string = '';
  showUpdateError: string = '';
  searchTerm: string = '';
  lastEID: string = '';

  isloading:boolean=false;

  employee: employee = new employee()
  EmployeeList: employee[] = []

  createEmployeeForm!: FormGroup;
  updateEmployeeForm!: FormGroup;

  constructor(public router: Router, public adminService:AdminService,private http: HttpClient,
    private formBuilder: FormBuilder, public userService: UserService,private title:Title){}
  ngOnInit(): void {

    this.title.setTitle('admindashboard');

    this.getAll();
    this.getDeliveryData()

    this.createEmployeeForm = this.formBuilder.group({
      Name: [''],
      Phone: [''],
      Section: [''],
      Salary: [''],
      EID: [''],
      Gender: ['']
      
    });

    this.updateEmployeeForm = this.formBuilder.group({
      Name: [''],
      Phone: [''],
      Section: [''],
      Salary: [''],
      EID: [''],
      Gender: ['']
    });
    
    if (localStorage.getItem('adminlogin') === null) {
      this.router.navigateByUrl('/adminlogin');
    }


  }
   getDeliveryData() {
    this.userService.getEmployeeData().subscribe(resp => {
      this.deliveryData = resp;
      console.log(resp);
    });
  }

  toggleDialog(employee: any) {
    this.selectedUser = employee;
    if(this.selectedUser.Gender === "male") {
      this.Gender = "Mr.";
    } else if (this.selectedUser.Gender === "female"){
      this.Gender = "Mrs.";
    }
    this.showDialog = !this.showDialog;
  }

  onSubmit() {
    this.validation();
  }

  Create() {
    this.createEmployeeForm.value.EID = this.lastEID;
    this.adminService.postEmployeeData(this.createEmployeeForm.value)
      .subscribe(resp => {
        console.log(resp);
        this.resetFormFields();
        this.ngOnInit();
      })
  }

  resetFormFields() {
    this.createEmployeeForm.reset();
  }

  getAll(): void {
    this.isloading=true;
    this.adminService.getEmployeeData().subscribe(resp => {
      this.EmployeeList = resp;
      console.log(resp);
    this.isloading=false;

      this.getLastEID();
    })
  }

  deleteList(id: number) {
    this.adminService.deleteEmployeeData(id).subscribe(
      result => {
        console.log(result);
      }
    );
    this.getAll();
    this.showDialog = !this.showDialog;
  }

  updateData(id: number) {
    this.adminService.updateEmployeeData(id, this.updateEmployeeForm.value).subscribe(result =>
      console.log(result)

    );

    this.ngOnInit();
    this.showDialog = false;
    this.showTextBox = false;
  }

  editAction(employee: any) {
    this.updateEmployeeForm.patchValue(employee);
  }
  
  onEdit() {
    this.showTextBox = !this.showTextBox;
  }

  getLastEID() {
    if (this.EmployeeList.length > 0) {
      const lastEmployee = this.EmployeeList[this.EmployeeList.length - 1];
      const lastEID = lastEmployee.EID;
      const last3Digits = lastEID.slice(-3);
      const incrementedValue = Number(last3Digits) + 1;
      this.lastEID = "EMP" + incrementedValue.toString().padStart(3, '0');
      console.log(lastEID);

    }
  }
  searchEmployees() {
    if (this.searchTerm.trim() === '') {
      this.getAll();
    } else {
      this.adminService.getEmployeeData().subscribe((data: employee[]) => {
        this.EmployeeList = data.filter(employee =>
          Object.values(employee).some(value =>
            String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        );
      });
    }
  }

  existingEmployee() {
    this.http.get<employee[]>('https://clothingbotiquesdb.onrender.com/employee').subscribe(
      (employees: employee[]) => {
        const found = employees.find(employee => employee.EID === this.EID);
        if (found) {
          this.showError = "Existing Employee! ( 'Try Another E-id' )";
        } else {
          this.Create();
        }
      });
  }



  validation() {
    if (this.Name === "") {
      this.showError = "Please enter Name";
    } 
 
    else if (this.Phone === "") {
      this.showError = "Please enter your Mobile No";
    } else if (parseInt(this.Phone) <= 0) {
      this.showError = "Invalid Mobile No";
    } else if (String(this.Phone).length !== 10) {
      this.showError = "Invalid Mobile No";
    } else if (this.Salary === "") {
      this.showError = "Please enter Salary";
    } else if (parseInt(this.Salary) <= 0) {
      this.showError = "Negative Value not valid";
    } else if (this.Section === "") {
      this.showError = "Please enter Section";
    } else if (this.Name && this.Phone && this.Salary && this.Section) {
      this.createEmployeeForm.value.date=this.formattedDate
      this.existingEmployee();
    }
  }
  logout() {
    localStorage.removeItem('adminlogin');
    this.router.navigateByUrl('\adminlogin');
  }
  
  admindashboard(){
    this.router.navigateByUrl('admindashboard')
  }
adminstaff(){
  this.router.navigateByUrl('adminstaff')
}
adminproduct(){
  this.router.navigateByUrl('adminproduct')
}
}