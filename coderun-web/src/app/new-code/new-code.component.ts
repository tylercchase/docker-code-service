import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    this.http.post(`${location.protocol}//${location.hostname}:3000/code`, this.codeForm.value, {withCredentials: true}).subscribe( () => {
    });
    this.router.navigate(['/dashboard']);

  }
}
