import { Component, OnInit } from '@angular/core';
import { BannerService } from './service/banner.service';
import { Banner } from './model/banner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  banner: Banner = { title: 'Default', subTitle: 'Default' };

  constructor(private bannerService: BannerService) {}

  ngOnInit(): void {
    this.bannerService.getBanner().subscribe((obj) => (this.banner = obj));
  }
}
