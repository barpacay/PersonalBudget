import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtestingComponent } from './utesting.component';

describe('ExampleComponent', () => {
  let component: UtestingComponent;
  let fixture: ComponentFixture<UtestingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtestingComponent],
    });
    fixture = TestBed.createComponent(UtestingComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct message', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('utesting works!');
  });

});
