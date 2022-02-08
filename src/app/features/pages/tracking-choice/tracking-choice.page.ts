import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EBikeService } from '../services/e-bike.service';
import { IBikeInfo, IDataScanner } from '../services/interfaces/interfaces';
import { ToastService } from '../services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tracking-choice',
  templateUrl: './tracking-choice.page.html',
  styleUrls: ['./tracking-choice.page.scss'],
})
export class TrackingChoicePage implements OnInit {
  uid: string;
  constructor( 
    private barcodeScanner: BarcodeScanner, 
    private router: Router, 
    private route : ActivatedRoute,
    private eBikeService: EBikeService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (res: Params) => this.uid = res.uid
    )
  }

  /**
   * Open QR scanner and get Data from QR
   * 
   * @returns {void}
   */
  onScanQRCode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };
    this.barcodeScanner.scan(options).then(barcodeData => {
      const barcodeText: IDataScanner = JSON.parse(barcodeData.text);
      this.eBikeService.checkQRCode(barcodeText).subscribe(
        (isValid: boolean) => {
          if(!isValid) {
            this.unsuccessReadingQR('Invalid QR Code');
            return;
          }
          this.eBikeService.findPosition(barcodeText.targa).subscribe(
            (bikeInfo: IBikeInfo) => {
              this.router.navigate(['/navigation', this.uid, barcodeText.targa]);
            },
            (err: HttpErrorResponse) => this.unsuccessReadingQR('Ops, Something goes wrong')
          )
        })
    }).catch(err => err);
  }

  /**
   * Create Toast if the QRCode is invalid 
   * 
   * @param {string} message 
   * @returns {void}
   */
  unsuccessReadingQR(message: string): void {
    this.toastService.unsuccesToast(message, 1000);
  }

  onTrackMyDevice() {
    this.router.navigate(['/navigation', this.uid]);
  }
}
