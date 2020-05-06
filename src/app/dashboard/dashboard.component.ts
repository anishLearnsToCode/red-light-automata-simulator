import {Component, OnDestroy, OnInit} from '@angular/core';
import {Crossing} from '../../model/crossing';
import {interval, Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  crossing = new Crossing();
  elapsedTime$: Subscription;
  milliSeconds = 0;
  seconds = 0;
  minutes = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  startSimulation() {
    this.elapsedTime$ = interval(20).subscribe((tick) => {
      this.milliSeconds = (tick + this.milliSeconds) % 100;
      this.seconds = Math.floor((tick + this.seconds) / 50);
      this.minutes = Math.floor((tick + this.minutes) / 3000);
    });
    this.crossing.startSimulation();
  }

  pauseSimulation() {
    if (this.crossing.simulationRunning && this.milliSeconds > 0) {
      this.elapsedTime$.unsubscribe();
      this.crossing.pauseSimulation();
    }
  }

  stopSimulation() {
    if (this.milliSeconds > 0) {
      this.elapsedTime$.unsubscribe();
      this.milliSeconds = this.seconds = this.minutes = 0;
      this.crossing.stopSimulation();
    }
  }

  ngOnDestroy(): void {
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
