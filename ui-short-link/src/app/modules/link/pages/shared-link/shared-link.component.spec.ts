import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedLinkComponent } from './shared-link.component';

describe('SharedLinkComponent', () => {
  let component: SharedLinkComponent;
  let fixture: ComponentFixture<SharedLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
