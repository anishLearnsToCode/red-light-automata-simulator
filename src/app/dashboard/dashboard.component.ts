import {Component, OnDestroy, OnInit} from '@angular/core';
import {Crossing} from '../../model/crossing';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  crossing = new Crossing();
  subscription: Subscription;
  second = 100000;

  constructor() {
    this.crossing.startSimulation();
  }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addCarInMainStreet() {
    this.crossing.addCarInMainStreet();
  }

  addCarInSideStreet(): void {
    this.crossing.addCarInSideStreet();
  }

  setSpeed1x() {
    this.crossing.runningSpeed = 1;
  }

  setSpeed2x() {
    this.crossing.runningSpeed = 2;
  }

  setSpeed5x(): void {
    this.crossing.runningSpeed = 5;
  }

  setSpeed10x(): void {
    this.crossing.runningSpeed = 10;
  }
}
