import {RedLight} from './red-light';
import {RedLightColor} from './red-light-color.enum';
import {interval, Observable, Subscription} from 'rxjs';
import {CrossingState} from './crossing-state.enum';

export class Crossing {
  mainStreetRedLight = new RedLight();
  sideStreetRedLight = new RedLight(RedLightColor.RED);
  carsInMainStreet = 5;
  carsInSideStreet = 0;
  mainStreetRunTime = 10;
  sideStreetRunTime = 10;
  crossingTime = 5;
  state: CrossingState;
  runningSpeed = 1;
  carCrossingHandler$: Subscription;
  stateTimer$: Observable<number>;
  stateHandler$: Subscription;
  simulationRunning = false;
  stateElapsedTime: number[] = [];

  constructor() {
  }

  stopSimulation() {
    this.simulationRunning = false;
    this.endCarCrossingHandler();
    this.endStateHandler();
    this.state = undefined;
  }

  endStateHandler() {
    if (this.stateHandler$) {
      this.stateHandler$.unsubscribe();
    }
  }

  endCarCrossingHandler() {
    this.carCrossingHandler$.unsubscribe();
  }

  pauseSimulation() {

  }

  startSimulation() {
    this.simulationRunning = true;
    this.createCarCrossingHandler();
    this.state1();
  }

  createCarCrossingHandler() {
    this.carCrossingHandler$ = this.createSimpleTimer(this.crossingTime).subscribe(((value) => {
      this.reduceCarFromCurrentLane();
    }));
  }

  reduceCarFromCurrentLane() {
    switch (this.state) {
      case CrossingState.STATE_1:
        this.carsInMainStreet = (this.carsInMainStreet === 0 ? 0 : --this.carsInMainStreet);
        break;
      case CrossingState.STATE_3:
        this.carsInSideStreet = (this.carsInSideStreet === 0 ? 0 : --this.carsInSideStreet);
    }
  }

  state1() {
    this.handleTransition(CrossingState.STATE_1);
    this.stateHandler$ = this.createSimpleTimer().subscribe((tick) => {
      this.stateElapsedTime[0] = tick;
      if ((tick > this.mainStreetRunTime) && (this.carsInSideStreet > 0)) {
        this.state2();
      }
    });
  }

  state2() {
    this.handleTransition(CrossingState.STATE_2);
    this.stateHandler$ = this.createSimpleTimer().subscribe((tick) => {
      this.stateElapsedTime[1] = tick;
      if (tick > this.crossingTime) {
        this.state3();
      }
    });
  }

  state3() {
    this.handleTransition(CrossingState.STATE_3);
    this.stateHandler$ = this.createSimpleTimer().subscribe((tick) => {
      this.stateElapsedTime[2] = tick;
      if (tick > this.crossingTime || this.carsInSideStreet === 0) {
        this.state4();
      }
    });
  }

  state4() {
    this.handleTransition(CrossingState.STATE_4);
    this.stateHandler$ = this.createSimpleTimer().subscribe((tick) => {
      this.stateElapsedTime[3] = tick;
      if (tick > this.crossingTime) {
        this.state1();
      }
    });
  }

  createSimpleTimer(seconds?: number): Observable<number> {
    seconds = seconds === undefined || null ? 1 : seconds;
    return interval(1000 * seconds / this.runningSpeed);
  }

  handleTransition(state: CrossingState) {
    this.state = state;
    this.stateTimer$ = undefined;
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
