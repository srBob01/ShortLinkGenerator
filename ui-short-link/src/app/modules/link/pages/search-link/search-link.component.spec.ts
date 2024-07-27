import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLinkComponent } from './search-link.component';

describe('SearchLinkComponent', () => {
  let component: SearchLinkComponent;
  let fixture: ComponentFixture<SearchLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
