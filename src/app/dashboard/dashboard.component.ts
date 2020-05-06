import { Component, OnInit } from '@angular/core';
import {Crossing} from '../../model/crossing';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  crossing = new Crossing();

  constructor() { }

  ngOnInit(): void {
  }

  addCarInMainStreet() {
    this.crossing.addCarInMainStreet();
  }

  addCarInSideStreet(): void {
    this.crossing.addCarInSideStreet();
  }
}
