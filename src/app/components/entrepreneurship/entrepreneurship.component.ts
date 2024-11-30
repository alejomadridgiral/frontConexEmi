import { Component } from '@angular/core';
import { Entrepreneurship, EntrepreneurshipService } from '../../services/entrepreneurship.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrepreneurship',
  standalone: false,
  
  templateUrl: './entrepreneurship.component.html',
  styleUrl: './entrepreneurship.component.css'
})
export class EntrepreneurshipComponent {

  entrepreneurships: Entrepreneurship[] = [];

  constructor(private entrepreneurshipservice: EntrepreneurshipService, private router: Router ) {}

  ngOnInit(): void {
    this.entrepreneurshipservice.getEntrepreneurship().subscribe((data) => (this.entrepreneurships = data));
    console.log(this.entrepreneurships)
  }

  
}
