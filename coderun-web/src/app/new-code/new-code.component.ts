import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-code',
  templateUrl: './new-code.component.html',
  styleUrls: ['./new-code.component.scss']
})
export class NewCodeComponent implements OnInit {
  codeForm = new FormGroup({
    title: new FormControl(''),
    language: new FormControl('')
  });
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    console.log("ASD");
    console.log(this.codeForm.value);
    this.http.post('http://localhost:3000/code', this.codeForm.value, {withCredentials: true}).subscribe();
  }
}
