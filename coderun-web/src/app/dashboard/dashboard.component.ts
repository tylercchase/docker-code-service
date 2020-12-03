import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient,
    private router: Router) { }
  codeBlocks = [];
  ngOnInit(): void {
    this.http.get(`${location.protocol}//${location.hostname}/api/dashboard`, {
      withCredentials: true
    }).subscribe((resp: any) => {
      this.codeBlocks = resp;
    },
    (err) => {
      console.log('User not authenticated')
      this.router.navigate(['/login']);
    });
  }
}
