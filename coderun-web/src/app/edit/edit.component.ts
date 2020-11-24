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
  id: number;
  code;

  codeForm = new FormGroup({
    title: new FormControl(''),
    language: new FormControl('')
  });
  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   this.id = params['id'];
    // });
    
    this.http.get(`http://localhost:3000/code/5fbccebb14c2a56ed042449b`,{
      withCredentials: true
    }).subscribe((codeBlock)=>{
      console.log(codeBlock);
      this.code = codeBlock;
    })
  }

  saveCode(): void {
    this.http.post(`http://localhost:3000/code/edit/5fbccebb14c2a56ed042449b`, this.codeForm.value, {withCredentials: true}).subscribe();
  }
}
