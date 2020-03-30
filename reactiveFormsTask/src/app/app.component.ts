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

  constructor(){}

  ngOnInit(): void{
    // Init array of status
    this.projectStatus = new Array<string>(
      "Stable", "Critical", "Finished"
    );
    // Init def. status
    this.defaultStatus = this.projectStatus[0];
    // Build form in TS
    this.assignmentForm = new FormGroup({
      'projectname': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'projectstatus': new FormControl(this.defaultStatus, Validators.required),
    });
  }

  onSubmitForm(){
    console.log(this.assignmentForm);
  }

}
