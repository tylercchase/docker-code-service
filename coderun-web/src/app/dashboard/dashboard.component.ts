import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  getStuff(): void{
    this.http.get('http://localhost:3000/dashboard', {
      withCredentials: true
    }).subscribe((resp: any) => {
      console.log("ASDASD")
      console.log(resp);
    });
  }

}
