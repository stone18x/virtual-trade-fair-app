import { Component, OnInit } from '@angular/core';
import { ContentService } from '../service/content.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-gallery',
  templateUrl: './detail-gallery.component.html',
  styleUrls: ['./detail-gallery.component.scss'],
})
export class DetailGalleryComponent implements OnInit {
  images = [944, 1011, 984].map(
    (n) => '../assets/custom/content/1/railjet.jpg'
  );
  galleryEntries = [];

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.contentService.getGalleryContent(id).subscribe((content) => {
      this.galleryEntries = content.entries;
    });
  }
}
