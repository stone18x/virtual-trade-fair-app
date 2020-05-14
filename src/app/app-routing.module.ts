import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailVideoComponent } from './detail-video/detail-video.component';
import { ViewerComponent } from './viewer/viewer.component';
import { DetailGalleryComponent } from './detail-gallery/detail-gallery.component';

const routes: Routes = [
  { path: '', component: ViewerComponent, pathMatch: 'full' },
  { path: 'detail-video/:id', component: DetailVideoComponent },
  { path: 'detail-gallery/:id', component: DetailGalleryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
