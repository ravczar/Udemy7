import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { promise } from 'protractor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectStatus: Array<string>;
  assignmentForm: FormGroup;
  defaultStatus: string;
  forbiddenProjectNames: Array<string>;
  itemSubmited: {projectname:string, email:string, status:string};
  formSubmited: boolean;

  constructor(){
    this.formSubmited = false;
    // Init array of status
    this.projectStatus = new Array<string>(
      "Stable", "Critical", "Finished"
    );
     // Init def. status
     this.defaultStatus = this.projectStatus[0];
     this.forbiddenProjectNames = new Array<string>("test", "idiot", "dumb");
  }

  ngOnInit(): void{
    // Build form in TS
    this.assignmentForm = new FormGroup({
      'projectname': new FormControl('Your username here', [Validators.required], [this.validateForbiddenProjectNamesAsync.bind(this)]),
      'email': new FormControl('', [Validators.required], [this.incompleteEmailAsync]),
      'projectstatus': new FormControl(this.defaultStatus, Validators.required),
    });
  }

  onSubmitForm(){
    console.log(this.assignmentForm.value);
    this.formSubmited = !this.formSubmited;
    this.itemSubmited = {
      projectname: this.assignmentForm.get('projectname').value,
      email: this.assignmentForm.get('email').value,
      status: this.assignmentForm.get('projectstatus').value,
    };
    
  }

  // Sync
  validateForbiddenProjectNames(control: FormControl): {[s: string]: boolean} {
    return this.forbiddenProjectNames.indexOf(control.value.toLowerCase()) !== -1 ? 
    {'projectNameIsForbidden': true} : 
    null;
  }
  // Async
  validateForbiddenProjectNamesAsync(control: FormControl) : Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(()=>{
        if( this.forbiddenProjectNames.indexOf(control.value.toLowerCase()) !== -1){
          resolve({'projectNameIsForbiddenAsync':true});
        } else {
          resolve(null);
        }
      },2500);
    });
    return promise;
  }

  // Sync
  incompleteEmail(control: FormControl): {[s: string]: boolean} {
    if (control.value.indexOf('@') === -1 || control.value.indexOf('.') === -1 || control.value.size() <= 8){
      return {'emailIsIncomplete': true};
    }
    return null;
  }
  // Async
  incompleteEmailAsync(control: FormControl) : Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(()=>{
        if (control.value.indexOf('@') === -1 || control.value.indexOf('.') === -1 || control.value.length < 8){
          resolve({'emailIsIncompleteAsync':true});
        } else {
          resolve(null);
        }
      },2500);
    });
    return promise;
  }

  resetForm():void {
    this.assignmentForm.patchValue({
      projectname: '',
      email: '',
      projectstatus: 'Stable'
    });
    //this.assignmentForm.reset();
  }
}
