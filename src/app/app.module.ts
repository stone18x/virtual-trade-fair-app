import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailVideoComponent } from './detail-video/detail-video.component';
import { ViewerComponent } from './viewer/viewer.component';
import { SafePipe } from './pipe/safe.pipe';
import { DetailGalleryComponent } from './detail-gallery/detail-gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailVideoComponent,
    ViewerComponent,
    SafePipe,
    DetailGalleryComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
