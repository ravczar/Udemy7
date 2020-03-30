import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectStatus: Array<string>;
  assignmentForm: FormGroup;

  constructor(){
    this.projectStatus = new Array<string>(
      "Stable", "Critical", "Finished"
    );
  }

  ngOnInit(){
    
  }

}
