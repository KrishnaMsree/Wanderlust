import { TestBed, inject, async } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [LoginService]
    })
    .compileComponents();
}));

  it('url should be equal to login url', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service.loginURL).toEqual('http://localhost:4000/user/login');
  });
  it('HttpClient must be injected in LoginService', inject([HttpClient], (http: HttpClient) => {
    expect(http).not.toBeNull('HttpClient should be provided');
    const service = new LoginService(http);
    expect(service instanceof LoginService).toBe(true, 'New service should be ok');
}));

});
