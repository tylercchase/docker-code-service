import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private http: HttpClient) { }
  id: string;
  code;
  output: string;
  codeForm = new FormGroup({
    code: new FormControl('')
  });
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.http.get(`${location.protocol}//${location.hostname}:3000/code/${this.id}`, {
        withCredentials: true
      }).subscribe((codeBlock) => {
        this.code = codeBlock;
        this.codeForm.patchValue({
          code: this.code.code
        });
      })
    });
  }
  saveCode(): void {
    this.http.post(`${location.protocol}//${location.hostname}:3000/code/edit/${this.id}`, this.codeForm.value, {withCredentials: true}).subscribe();
  }
  runCode(): void {
    this.http.get(`${location.protocol}//${location.hostname}:3000/code/run/${this.id}`, {withCredentials: true}).subscribe((res) => {
      console.log(res);
      this.output = res['output'];
    });
  }
}
