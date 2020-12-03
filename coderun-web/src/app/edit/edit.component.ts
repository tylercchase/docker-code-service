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
  codeBlockData;
  code;
  language;
  output: string;

  editorOptions = {theme: 'vs-dark', language: 'python'};

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.http.get(`${location.protocol}//${location.hostname}/api/code/${this.id}`, {
        withCredentials: true
      }).subscribe((codeBlock) => {
        console.log(codeBlock);
        this.codeBlockData = codeBlock;
        this.code = this.codeBlockData.code;
        this.language = this.codeBlockData.language;
        this.editorOptions['language'] = 'python';//this.codeBlockData.language;
      })
    });
  }
  saveCode(): void {
    this.http.post(`${location.protocol}//${location.hostname}/api/code/edit/${this.id}`,
     {code: this.code, language: this.language}, {withCredentials: true}).subscribe();
  }
  runCode(): void {
    this.http.get(`${location.protocol}//${location.hostname}/api/code/run/${this.id}`, {withCredentials: true}).subscribe((res) => {
      console.log(res);
      this.output = res['output'];
    });
  }
  updateLanguage(userLanguage):void {
    this.language = userLanguage;
  }
}
