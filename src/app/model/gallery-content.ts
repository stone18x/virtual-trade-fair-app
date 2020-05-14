export interface GalleryContent {
  id: string;
  entries: GalleryEntry[];
}

export interface GalleryEntry {
  header: string;
  description: string;
  img: string;
}
