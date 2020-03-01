const LOWEST_Z_INDEX = 0;
const HIGHEST_Z_INDEX = 1;
const AVERAGE_Z_INDEX = 2;

export default class PaintersAlgorithm {
    constructor() {}

    static sort(vertices, polygons, method = AVERAGE_Z_INDEX) {
        const zIndices = [];
        const newPolygons = [];
        let zIndex;
        for (let i = 0; i < polygons.length; i++) {
          switch (method) {
            case LOWEST_Z_INDEX:
              zIndex = vertices[polygons[i].vertexIndices[0]].z;
              for (let j = 0; j < polygons[i].vertexIndices.length; j++) {
                if (vertices[polygons[i].vertexIndices[j]].z < zIndex)
                  zIndex = vertices[polygons[i].vertexIndices[j]].z;
              }
              zIndices[i] = {
                value: zIndex,
                polygon: polygons[i]
              };
              break;
            case HIGHEST_Z_INDEX:
              zIndex = vertices[polygons[i].vertexIndices[0]].z;
              for (let j = 0; j < polygons[i].vertexIndices.length; j++) {
                if (vertices[polygons[i].vertexIndices[j]].z > zIndex)
                  zIndex = vertices[polygons[i].vertexIndices[j]].z;
              }
              zIndices[i] = {
                value: zIndex,
                polygon: polygons[i]
              };
              break;
            case AVERAGE_Z_INDEX:
              zIndex = 0;
              for (let j = 0; j < polygons[i].vertexIndices.length; j++) {
                zIndex += vertices[polygons[i].vertexIndices[j]].z;
              }
              zIndex /= polygons[i].vertexIndices.length;
              zIndices[i] = {
                value: zIndex,
                polygon: polygons[i]
              };
              break;
            default:
              console.log("No accepted value given");
          }
        }

        zIndices.sort((a, b) => b.value - a.value);

        for (let i = 0; i < zIndices.length; i++)
            newPolygons.push(zIndices[i].polygon);

        return newPolygons;
    }
}
