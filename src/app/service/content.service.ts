import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { safeLoad } from 'js-yaml';
import { Content } from '../model/content';
import { VideoContent } from '../model/video-content';
import { GalleryContent, GalleryEntry } from '../model/gallery-content';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private http: HttpClient) {}

  getContent(id: string) {
    return this.http.get(this.getUrl(id), { responseType: 'text' }).pipe(
      map((data) => safeLoad(data)),
      map((jsonObj) => this.convertToContentObject(id, jsonObj))
    );
  }

  private getUrl(id: string) {
    return `assets/custom/content/${id}/content.yaml`;
  }

  private convertToContentObject(id: string, data: any): Content {
    return {
      id: id,
      header: data.content.header,
      description: data.content.description,
      type: data.content.type,
    };
  }

  getVideoContent(id: string) {
    return this.http.get(this.getUrl(id), { responseType: 'text' }).pipe(
      map((data) => safeLoad(data)),
      map((jsonObj) => this.convertToVideoContentObject(id, jsonObj))
    );
  }

  private convertToVideoContentObject(id: string, data: any): VideoContent {
    return {
      id: id,
      header: data.details.header,
      videoUrl: data.details.video.url,
    };
  }

  getGalleryContent(id: string) {
    return this.http.get(this.getUrl(id), { responseType: 'text' }).pipe(
      map((data) => safeLoad(data)),
      map((jsonObj) => this.convertToGalleryContentObject(id, jsonObj))
    );
  }

  private convertToGalleryContentObject(id: string, data: any): GalleryContent {
    const galleryEntries = data.details.gallery.map((e) => {
      return {
        header: e.header,
        description: e.description,
        img: `assets/custom/content/${id}/${e.img}`,
      } as GalleryEntry;
    });

    return {
      id: id,
      entries: galleryEntries,
    };
  }
}
