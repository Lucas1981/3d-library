# 3D Object creation and animation library

This is a simple library with which to create and manipulate 3D objects. I started this library a while ago, trying to apply the principles from the book Mathematics for 3D Game Programming and Computer Graphics, writing it all in TypeScript. Then I destroyed my computer and lost everything, with all I had left being [a compiled Dodecahedron demo](http://zzp-online-marketing.nl/js-portfolio/dodecahedron/). I wanted to get back to it so now I'm trying to figure out how all of that hung together, based on the source code from that demo and trying to figure out how everything works. It's still very much a work in progress.

## The buildup

So, everything starts with the world. A `World` class should be instantiated and it's `draw()` method called on an loop from the `AnimationFactory`. You can add objects of the `Object3D` type to that world with the `addObject()` method on the world object. The 3D Objects are composed of primarily an array of Point3D objects in its `vertices` member and polygons of the `Polygon3D` type that have an array of `vertexIndices` references that point back to entries in the `vertices` member. This is roughly based on principles outlined in the old book Tricks of the 3D Game Programming Gurus.

When the `world` object renders the world, it makes use of the `ViewFrustum` class, which has a pointer to the actual `Canvas` object that does the final drawing, and the conversion from a Point3D to a Point2D object actually also takes place in the `viewFrustum` object, using the `getProjected2DPoint` method. When the draw method is called all the polygons in all the objects in the world are all thrown together in one big pool, ran through the static `sort()` method of the `PaintersAlgorithm` class and then all processed at once.

## Translate, scale and rotate

Translation, scaling and rotation can now take place. Translation is done on initiation of the objects, specifying x, y and z coordinates. rotation can be done with several methods like `rotate()` and `scale()` on the `Object3D` instance. It uses matrix multiplications, tucked away in the `./matrix` folder. This includes the `Matrix` class representing the simple unit that the matrix mutations work with, `Matrices` with a bunch of static methods that takes two `Matrix` instances as arguments and performs a certain act on both combined, a `MatrixFactory` with static methods for producing specific types of matrices that other methods might use, and to produce a mutation on a single matrix, and the MatrixAdapter creating adaptation possibilities between `Matrix` and `Point3D` objects. The `TransformFactory` class in the end exposes what is produced based on matrices to apply it to the `Object3D` instances.

Some functionality is still missing for `World` and `Object3D`, mainly concerning entire methods and refinements to the drawing process. Also the fish-eye lens effect seems to be troubling the rendition.

## Vectors and back-face culling

I added all the classes that handle vectors now, with methods like `crossProduct()` and `dotProduct()` and also adding/subtracting vectors, all in the `Vector3D` and the `Vectors` classes. This is done so the back-face culling method can be applied to all the polygons, determining whether or not they are facing the right way, based on their coordinates. It's not working super smoothly yet right now. Could be because the polygons are not triangles. Could be because of the fish-eye effect not properly resolving. Could be because I'm not using the camera point as something that the back-face culling takes into account. Not really sure yet. So for now, I'll set the flag that enables the back-face culling to be applied to false in the `World` and stick to the painter's algorithm.

## Lights

I've added controls for lights. It can create three types of light sources: directional, point and spotlight, with the `Lights` class. That light is then computed to create some sort of lighting when it hits a certain point. The qualities of lighting are also three: ambient, diffuse and specular. The quality of the lighting is determined with the `Lighting` class. Both classes live in the `./lights` folder and are handled after the world transformation, but before the camera transformation in the rendering pipeline.
