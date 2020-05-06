import {RedLight} from './red-light';
import {RedLightColor} from './red-light-color.enum';

export class Crossing {
  mainStreetRedLight: RedLight;
  sideStreetRedLight: RedLight;
  carsInMainStreet = 0;
  carsInSideStreet = 0;

  constructor() {
    this.mainStreetRedLight = new RedLight();
    this.sideStreetRedLight = new RedLight();
  }

  state1() {
    this.mainStreetRedLight.state = RedLightColor.GREEN;
    this.sideStreetRedLight.state = RedLightColor.RED;
  }

  state2() {
    this.mainStreetRedLight.state = RedLightColor.YELLOW;
    this.sideStreetRedLight.state = RedLightColor.RED;
  }

  state3() {
    this.mainStreetRedLight.state = RedLightColor.RED;
    this.sideStreetRedLight.state = RedLightColor.GREEN;
  }

  state4() {
    this.mainStreetRedLight.state = RedLightColor.RED;
    this.sideStreetRedLight.state = RedLightColor.YELLOW;
  }

  addCarInMainStreet(): void {
    this.carsInMainStreet++;
  }

  addCarInSideStreet(): void {
    this.carsInSideStreet++;
  }
}
