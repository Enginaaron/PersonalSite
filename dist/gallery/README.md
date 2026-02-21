# Gallery Photos

Place your photos in this folder. Supported formats: `.jpg`, `.png`, `.webp`.

After adding images, update the `galleryImages` array in `src/data/content.ts` with the filename and a caption:

```ts
export const galleryImages: GalleryImage[] = [
  { src: "/gallery/your-photo.jpg", caption: "A description of the photo" },
];
```

The carousel on the site will automatically pick them up.
