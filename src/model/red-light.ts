import {RedLightColor} from './red-light-color.enum';

export class RedLight {
  state: RedLightColor;

  constructor(state?: RedLightColor) {
    this.state = state ? state : RedLightColor.GREEN;
  }
}
