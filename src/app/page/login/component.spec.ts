import {LoginPageComponent} from './component';
import {async, ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';
import {AppService} from '../../service/app';
import {FakeAppService} from '../../service/fake-app';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {UiService} from '../../service/ui';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('Page Login', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let service: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        NoopAnimationsModule
      ],
      declarations: [ LoginPageComponent ],
      providers: [
        UiService,
        {
          provide: AppService,
          useClass: FakeAppService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AppService);
    service.clearAll();
    fixture.detectChanges();
  });

  afterEach(() => {
    service.clearAll();
  });

  it('Should create', () => {
    expect(component).toBeDefined();
  });

  it('Wrong credentials', fakeAsync(() => {
    component.form.patchValue({
      name: 'admin',
      password: 'passwdWrong'
    });
    component.save();
    tick(4000);
    flush();
    expect(service.isAuthenticated()).toBeFalsy();
  }));

  it('Right credentials', fakeAsync(() => {
    component.form.patchValue({
      name: 'admin',
      password: 'passwd'
    });
    component.save();
    tick(4000);
    flush();
    expect(service.isAuthenticated()).toBeTruthy();
  }));

});
