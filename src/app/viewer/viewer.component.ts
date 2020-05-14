import { Component, HostListener, OnInit } from '@angular/core';
import roomViewJson from '../../../src/assets/custom/room.json';
import { ContentService } from '../service/content.service';
import { Router } from '@angular/router';
import { Content } from '../model/content';
import { isNullOrUndefined } from 'util';
import $ from 'jquery';

declare const initializeRoomView: any;

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnInit {
  selectedContent: Content;

  private itemsLoaded = 0;
  loadingDone = false;

  constructor(private contentService: ContentService, private router: Router) {}

  ngOnInit() {
    initializeRoomView(roomViewJson);
  }

  @HostListener('document:onItemSelected', ['$event'])
  onItemSelected(evt: CustomEvent) {
    let id = -1;
    // TODO: Must be fixed to use id
    if ('Dining table' === evt.detail.metadata.itemName) id = 1;
    if ('Media Console - White' === evt.detail.metadata.itemName) id = 2;

    if (id >= 0) {
      this.contentService.getContent(id.toString()).subscribe((content) => {
        this.selectedContent = content;
      });
    }
  }

  @HostListener('document:onItemUqnselected')
  onItemUnselected() {
    this.selectedContent = null;
  }

  @HostListener('document:onItemsLoaded')
  onItemsLoaded() {
    this.itemsLoaded++;
    if (this.itemsLoaded === 2) {
      this.loadingDone = true;
      $('#viewer').attr('class', 'viewer-ready');
    }
  }

  onClickDetailsButton() {
    if (isNullOrUndefined(this.selectedContent)) return;

    if ('video' === this.selectedContent.type) {
      this.router.navigate(['/detail-video', this.selectedContent.id]);
    }

    if ('gallery' === this.selectedContent.type) {
      this.router.navigate(['/detail-gallery', this.selectedContent.id]);
    }
  }
}
