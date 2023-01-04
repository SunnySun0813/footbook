import { HttpInterceptor, HttpRequest, HttpHandler} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private http:HttpService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.http.getToken();
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", 'Bearer ' + authToken)
    });
    console.log(1);
    return next.handle(authRequest);
  }
}
