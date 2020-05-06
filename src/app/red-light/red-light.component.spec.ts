import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedLightComponent } from './red-light.component';

describe('RedLightComponent', () => {
  let component: RedLightComponent;
  let fixture: ComponentFixture<RedLightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedLightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
