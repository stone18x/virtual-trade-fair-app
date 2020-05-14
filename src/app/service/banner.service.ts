import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { safeLoad } from 'js-yaml';
import { map } from 'rxjs/operators';
import { Banner } from '../model/banner';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  constructor(private http: HttpClient) {}

  getBanner() {
    return this.http
      .get('assets/custom/content/banner.yaml', { responseType: 'text' })
      .pipe(
        map((data) => safeLoad(data)),
        map((jsonObj) => this.convertToBannerObject(jsonObj))
      );
  }

  private convertToBannerObject(data: any): Banner {
    return {
      title: data.title,
      subTitle: data['sub-title'],
    };
  }
}
