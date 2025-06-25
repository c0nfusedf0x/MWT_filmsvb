import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsNewComponent } from './films-new.component';

describe('FilmsNewComponent', () => {
  let component: FilmsNewComponent;
  let fixture: ComponentFixture<FilmsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmsNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
