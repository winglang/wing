// This file was auto generated from an example found in: 02-application-tree.md_example_5
// Example metadata: {"valid":true}
class ThumbnailBucket {
  //...
}

class ImageStorage {
  new() {
    new ThumbnailBucket(); // This ThumbnailBucket will be a child of a ImageStorage instance in the construct tree
  }
}

let imageStorage = new ImageStorage(); // This goes in root
let defaultThumbnails = new ThumbnailBucket() as "defaultThumbs" in imageStorage; // This is explicitly named "defaultThumbs" and explicitly placed inside imageStorage

// Here's a tree view of the generated infrastructure:
//
//                   root
//                  /
//            ImageStorage  
//             /       \
//  ThumbnailBucket    defaultsThumbs
