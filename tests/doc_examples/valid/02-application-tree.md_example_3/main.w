// This file was auto generated from an example found in: 02-application-tree.md_example_3
// Example metadata: {"valid":true}
class ThumbnailBucket {
  //...
}

class ImageStorage {
  new() {
    new ThumbnailBucket(); // This ThumbnailBucket will be a child of a ImageStorage instance in the construct tree
  }
}

new ImageStorage(); // This ImageStorage will be a child of the root in the construct tree
new ThumbnailBucket(); // This Counter will be a child of of the root in the construct tree

// Here's a tree view of the generated infrastructure:
//
//              root
//               /\
//   ImageStorage  ThumbnailBucket
//    /
//  ThumbnailBucket
