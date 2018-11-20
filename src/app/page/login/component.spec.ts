import {LoginPageComponent} from './component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppService} from '../../service/app';
import {FakeAppService} from '../../service/fake-app';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {UiService} from '../../service/ui';
import {MatSnackBarModule} from '@angular/material';

fdescribe('Page Login', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let service: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        MatSnackBarModule
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

  it('Wrong credentials', () => {
    component.form.patchValue({
      login: 'admin',
      password: 'passwdWrong'
    });
    component.save();
    expect(service.isAuthenticated()).toBeTruthy();
  });

  it('Right credentials', () => {
    component.form.patchValue({
      login: 'admin',
      password: 'passwd'
    });
    component.save();
    expect(service.isAuthenticated()).toBeTruthy();
  });

});
