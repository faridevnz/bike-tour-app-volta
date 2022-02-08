import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IBikeInfo, IDataScanner, IToken } from "./interfaces/interfaces";
import { eBikeCredential } from "src/app/credential";

@Injectable({
  providedIn: 'root'
})
export class EBikeService {

  private signInUrl: string = 'https://cycle-api.pirelli.digital/prd/api/Scuola/Account/signin';
  private findPositionUrl: string = 'https://cycle-api.pirelli.digital/prd/api/Scuola/Posizioni/CercaPosizione?Targa=';

  constructor(
    private http: HttpClient
  ) {
    this.signIn()
      .subscribe((res: IToken) => localStorage.setItem('e-bike-jwt', res.token));
  }

  /**
   * Http Request (SignIn) to E-Bike Service
   * 
   * @returns {Observable<IToken | HttpErrorResponse>}
   */
  private signIn(): Observable<IToken | HttpErrorResponse> {
    return this.http.post(this.signInUrl, eBikeCredential) as Observable<
      IToken | HttpErrorResponse
    >;
  }

  /**
   * Find current position of my bike with given 'targa'
   * 
   * @param {string} targa 
   * @returns {Observable<IBikeInfo | HttpErrorResponse>}
   */
  public findPosition(targa: string): Observable<IBikeInfo | HttpErrorResponse> {
    let jwt = localStorage.getItem('e-bike-jwt');
    const httpOption = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Authorization': 'Bearer ' + jwt
      })
    } 
    return this.http.get(this.findPositionUrl + targa, httpOption) as Observable<IBikeInfo | HttpErrorResponse>;    
  }

  /**
   * Check if QRCode scanned is valid
   * 
   * @param {IDataScanner} barcodeScanner 
   * @returns {Observable<boolean>}
   */
  checkQRCode(barcodeScanner: IDataScanner): Observable<boolean> {
    return new Observable((observe) => {
      barcodeScanner.targa ? observe.next(true) : observe.error(false)
    });
  }
}