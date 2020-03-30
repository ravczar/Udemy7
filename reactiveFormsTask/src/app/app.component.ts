import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';

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

  constructor(){
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
      'projectname': new FormControl('', [Validators.required, this.validateForbiddenProjectNames.bind(this)]),
      'email': new FormControl('', Validators.required),
      'projectstatus': new FormControl(this.defaultStatus, Validators.required),
    });
  }

  onSubmitForm(){
    console.log(this.assignmentForm);
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
      setTimeout(()=>{},1500);
    });
  }

}
