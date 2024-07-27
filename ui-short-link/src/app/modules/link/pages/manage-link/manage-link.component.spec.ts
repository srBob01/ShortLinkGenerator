import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLinkComponent } from './manage-link.component';

describe('ManageLinkComponent', () => {
  let component: ManageLinkComponent;
  let fixture: ComponentFixture<ManageLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
