import {RedLight} from './red-light';
import {RedLightColor} from './red-light-color.enum';
import {interval, Observable, Subscription} from 'rxjs';
import {CrossingState} from './crossing-state.enum';

export class Crossing {
  mainStreetRedLight = new RedLight();
  sideStreetRedLight = new RedLight(RedLightColor.RED);
  carsInMainStreet = 100;
  carsInSideStreet = 50;
  mainStreetRunTime = 10;
  sideStreetRunTime = 10;
  crossingTime = 5;
  state: CrossingState;
  runningSpeed = 1;
  stateHandler$: Subscription;
  simulationRunning = false;
  stateElapsedTime: number[] = [];
  totalElapsedTimeSeconds = 0;
  crossingTimeSeconds = 0;
  waitTime = 5;

  constructor() {
  }

  stopSimulation() {
    this.simulationRunning = false;
    this.endStateHandler();
    this.state = undefined;
    this.setElapsedTimesToZero();
  }

  setElapsedTimesToZero(): void {
    this.totalElapsedTimeSeconds = 0;
    this.crossingTimeSeconds = 0;
  }

  initializeRedLights(): void {
    this.mainStreetRedLight = new RedLight();
    this.sideStreetRedLight = new RedLight(RedLightColor.RED);
  }

  endStateHandler() {
    if (this.stateHandler$) {
      this.stateHandler$.unsubscribe();
    }
  }

  startSimulation() {
    this.simulationRunning = true;
    this.initializeRedLights();
    this.state1();
  }

  state1() {
    this.handleTransition(CrossingState.STATE_1);
    this.stateHandler$ = this.createTimer().subscribe((tick) => {
      this.stateElapsedTime[0] = tick + 1;
      this.crossingTimeSeconds = this.stateElapsedTime[0] % this.crossingTime;
      this.totalElapsedTimeSeconds++;
      if ((tick + 1) % this.crossingTime === 0) {
        this.carsInMainStreet = this.carsInMainStreet === 0 ? 0 : this.carsInMainStreet - 1;
      }
      if ((tick + 1 >= this.mainStreetRunTime) && (this.carsInSideStreet > 0)) {
        this.state2();
      }
    });
  }

  state2() {
    this.handleTransition(CrossingState.STATE_2);
    this.stateHandler$ = this.createTimer().subscribe((tick) => {
      this.stateElapsedTime[1] = tick + 1;
      this.totalElapsedTimeSeconds++;
      if (tick + 1 >= this.waitTime) {
        this.state3();
      }
    });
  }

  state3() {
    this.handleTransition(CrossingState.STATE_3);
    this.stateHandler$ = this.createTimer().subscribe((tick) => {
      this.stateElapsedTime[2] = tick + 1;
      this.crossingTimeSeconds = this.stateElapsedTime[2] % this.crossingTime;
      this.totalElapsedTimeSeconds++;
      if ((tick + 1) % this.crossingTime === 0) {
        this.carsInSideStreet = this.carsInSideStreet === 0 ? 0 : this.carsInSideStreet - 1;
      }
      if (tick + 1 >= this.sideStreetRunTime || this.carsInSideStreet === 0) {
        this.state4();
      }
    });
  }

  state4() {
    this.handleTransition(CrossingState.STATE_4);
    this.stateHandler$ = this.createTimer().subscribe((tick) => {
      this.stateElapsedTime[3] = tick + 1;
      this.totalElapsedTimeSeconds++;
      if (tick + 1 >= this.waitTime) {
        this.state1();
      }
    });
  }

  createTimer(seconds?: number): Observable<number> {
    seconds = seconds === undefined || null ? 1 : seconds;
    return interval(1000 * seconds / this.runningSpeed);
  }

  handleTransition(state: CrossingState) {
    this.state = state;
    this.crossingTimeSeconds = 0;
    if (this.stateHandler$) {
      this.stateHandler$.unsubscribe();
    }
    this.setRedLightColorForMainStreet();
    this.setRedLightColorForSideStreet();
  }

  setRedLightColorForMainStreet() {
    switch (this.state) {
      case CrossingState.STATE_1:
        this.mainStreetRedLight.state = RedLightColor.GREEN;
        break;
      case CrossingState.STATE_2:
        this.mainStreetRedLight.state = RedLightColor.YELLOW;
        break;
      case CrossingState.STATE_3:
      case CrossingState.STATE_4: this.mainStreetRedLight.state = RedLightColor.RED;
    }
  }

  setRedLightColorForSideStreet() {
    switch (this.state) {
      case CrossingState.STATE_1:
      case CrossingState.STATE_2:
        this.sideStreetRedLight.state = RedLightColor.RED;
        break;
      case CrossingState.STATE_3:
        this.sideStreetRedLight.state = RedLightColor.GREEN;
        break;
      case CrossingState.STATE_4:
        this.sideStreetRedLight.state = RedLightColor.YELLOW;
    }
  }

  addCarInMainStreet(): void {
    this.carsInMainStreet++;
  }

  addCarInSideStreet(): void {
    this.carsInSideStreet++;
  }
}
