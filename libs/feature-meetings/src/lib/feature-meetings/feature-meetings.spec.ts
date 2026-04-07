import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureMeetings } from './feature-meetings';

describe('FeatureMeetings', () => {
  let component: FeatureMeetings;
  let fixture: ComponentFixture<FeatureMeetings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureMeetings],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureMeetings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
