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

  constructor(){}

  ngOnInit(): void{
    this.projectStatus = new Array<string>(
      "Stable", "Critical", "Finished"
    );

    this.assignmentForm = new FormGroup({
      'projectname': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'projectstatus': new FormControl(null, Validators.required),
    });

  }

  onSubmitForm(){
    console.log(this.assignmentForm);
  }

}
