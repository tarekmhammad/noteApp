import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';



@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  constructor(public _AuthService: AuthService) { }




}
