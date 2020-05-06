import {Component, Input, OnInit} from '@angular/core';
import {RedLight} from '../../model/red-light';

@Component({
  selector: 'app-red-light',
  templateUrl: './red-light.component.html',
  styleUrls: ['./red-light.component.css']
})
export class RedLightComponent implements OnInit {

  @Input() redLight: RedLight;

  constructor() { }

  ngOnInit(): void {
  }

}
