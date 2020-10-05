import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';

export class Config {
    httpOptions: any = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(localStorage.getItem('userToken')).token
        })
    }
}