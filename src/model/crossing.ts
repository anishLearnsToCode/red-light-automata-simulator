import {RedLight} from './red-light';
import {RedLightColor} from './red-light-color.enum';
import {interval, Observable, Subscription} from 'rxjs';
import {CrossingState} from './crossing-state.enum';

export class Crossing {
  mainStreetRedLight = new RedLight();
  sideStreetRedLight = new RedLight(RedLightColor.RED);
  carsInMainStreet = 10;
  carsInSideStreet = 10;
  mainStreetRunTime = 10;
  sideStreetRunTime = 25;
  crossingTime = 5;
  state = CrossingState.STATE_1;
  runningSpeed = 1;
  globalTimer$: Observable<number>;
  carCrossingHandler$: Subscription;
  stateTimer$: Observable<number>;
  stateHandler$: Subscription;

  constructor() {
  }

  startSimulation() {
    this.globalTimer$ = this.createSimpleTimer();
    this.createCarCrossingHandler();
    this.state1();
  }

  createCarCrossingHandler() {
    this.carCrossingHandler$ = this.createSimpleTimer(this.crossingTime).subscribe(((value) => {
      console.log(value);
      this.reduceCarFromCurrentLane();
    }));
  }

  reduceCarFromCurrentLane() {
    switch (this.state) {
      case CrossingState.STATE_1:
        console.log('reducing');
        this.carsInMainStreet = (this.carsInMainStreet === 0 ? 0 : --this.carsInMainStreet);
        break;
      case CrossingState.STATE_3:
        console.log('reducing');
        this.carsInSideStreet = (this.carsInSideStreet === 0 ? 0 : --this.carsInSideStreet);
    }
  }

  state1() {
    this.handleTransition(CrossingState.STATE_1);
    this.stateHandler$ = this.createSimpleTimer().subscribe((value) => {
      if ((value > this.mainStreetRunTime) && (this.carsInSideStreet > 0)) {
        this.state2();
      }
    });
  }

  state2() {
    this.handleTransition(CrossingState.STATE_2);
    setTimeout(() => { this.state3(); }, this.crossingTime * 1000 / this.runningSpeed);
  }

  state3() {
    this.handleTransition(CrossingState.STATE_3);
    this.stateHandler$ = this.createSimpleTimer().subscribe((tick) => {
      if (tick > this.crossingTime || this.carsInSideStreet === 0) {
        this.state4();
      }
    });
  }

  state4() {
    this.handleTransition(CrossingState.STATE_4);
    setTimeout(() => { this.state1(); }, this.crossingTime * 1000 / this.runningSpeed);
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
