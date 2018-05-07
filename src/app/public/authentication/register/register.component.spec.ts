import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import { Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy;
  let auts;

  beforeEach(async(() => {

    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const httpSpy = jasmine.createSpyObj('HttpClient', ['post']);
    //const authServiceSpy = jasmine.createSpy('AuthService').and.returnValue({ subscribe: () => {} });

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ RegisterComponent ],
      providers: [ AuthService , {provide: Router, useValue: routerSpy}, {provide: HttpClient, useValue: httpSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    //authService = TestBed.get(AuthService);
    auts = fixture.debugElement.injector.get(AuthService);
    authServiceSpy = spyOn(auts, 'register').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a formgroup after ngOnInit', () => {
    component.ngOnInit();
    expect(component.registerForm).toBeDefined();
  });

  it('should print an error after handleUnauthorizedError', function () {
    const returnedError = component.handleUnauthorizedError('wrong');
    expect(returnedError).toBe(console.log('wrong'), 'the output is wrong');
  });

  it('should change mail of student to studentmail', function () {
    const student = 's1094208';
    component.registerForm.get('mail').setValue(student);
    fixture.detectChanges();
    component.studentMail();
    expect(component.email).toBe(student + '@student.hsleiden.nl');
    expect(component.roleTitle).toBe('Student');
    expect(component.studentMail).toBeTruthy();
  });

  it('should change mail of teachers to normal mail', function () {
    const teacher = 'anna.verbree';
    component.registerForm.get('mail').setValue(teacher);
    fixture.detectChanges();
    component.studentMail();
    expect(component.email).toBe(teacher + '@hsleiden.nl');
    expect(component.roleTitle).toBe('Monitor');
    const returnedStudentMail = component.studentMail();
    expect(returnedStudentMail).toBe(false);
  });

  it('should tell router to navigate when submit clicked', function () {
    component.registerForm.get('mail').setValue('s1094208');
    component.registerForm.get('passwords').get('firstpass').setValue('Wachtwoord1@');
    component.registerForm.get('passwords').get('secondpass').setValue('Wachtwoord1@');
    component.registerForm.get('firstName').setValue('Anna');
    component.registerForm.get('lastName').setValue('Verbree');
    component.registerForm.get('phone').setValue('0611111111');

    fixture.detectChanges();

    //authSpy = spyOn(authService, 'register').and.returnValue({ subscribe: () => {} });

    component.register();
    expect(authServiceSpy).toHaveBeenCalled();

    //expect(authService.register).toHaveBeenCalled();
  });

});
