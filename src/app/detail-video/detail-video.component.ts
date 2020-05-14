import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../service/content.service';

@Component({
  selector: 'app-detail-video',
  templateUrl: './detail-video.component.html',
  styleUrls: ['./detail-video.component.scss'],
})
export class DetailVideoComponent implements OnInit {
  url = '';

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.contentService.getVideoContent(id).subscribe((content) => {
      this.url = content.videoUrl;
    });
  }
}
