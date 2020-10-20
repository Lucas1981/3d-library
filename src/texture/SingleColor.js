export default class SingleColor {
  constructor() {}

  static fillTriangleFlatBottom(triangle, color, contextData) {
    const dxl = (triangle[0][0] - triangle[2][0]) / (triangle[0][1] - triangle[2][1]);
    const dxr = (triangle[0][0] - triangle[1][0]) / (triangle[0][1] - triangle[1][1]);
    let clx = triangle[0][0];
    let crx = triangle[0][0];

    for (let cy = triangle[0][1]; cy <= triangle[2][1]; cy++) {
    	let base = ((cy * contextData.width) + Math.ceil(crx > clx ? clx : crx)) * 4;
    	for (let i = Math.ceil(crx > clx ? clx : crx); i <= Math.ceil(crx > clx ? crx : clx); i++) {
    		contextData.data[base++] = color[0];
    		contextData.data[base++] = color[1];
    		contextData.data[base++] = color[2];
    		contextData.data[base++] = color[3];
    	}

    	crx += dxr;
    	clx += dxl;
    }
  }

  static fillTriangleFlatTop(triangle, color, contextData) {
  	const dxl = (triangle[2][0] - triangle[0][0]) / (triangle[2][1] - triangle[0][1]);
  	const dxr = (triangle[2][0] - triangle[1][0]) / (triangle[2][1] - triangle[1][1]);
  	let clx = triangle[2][0];
  	let crx = triangle[2][0];

  	for (let cy = triangle[2][1]; cy >= triangle[0][1]; cy--) {
  		let base = ((cy * contextData.width) + Math.ceil(crx > clx ? clx : crx)) * 4;
  		for (let i = Math.ceil(crx > clx ? clx : crx); i <= Math.ceil(crx > clx ? crx : clx); i++) {
  			contextData.data[base++] = color[0];
  			contextData.data[base++] = color[1];
  			contextData.data[base++] = color[2];
  			contextData.data[base++] = color[3];
  		}

  		crx -= dxr;
  		clx -= dxl;
  	}
  }

  static drawGeneralTriangle(triangle, color, contextData) {
  	triangle.sort((a, b) => a[1] - b[1]);

  	if (triangle[1][1] == triangle[2][1]) {
  		fillTriangleFlatBottom(triangle, color, contextData);
  	} else if (triangle[0][1] == triangle[1][1]) {
  		fillTriangleFlatTop(triangle, color, contextData);
  	} else {
  		const v1 =
        [triangle[0][0] + ((triangle[2][0] - triangle[0][0]) *
  		  (triangle[1][1] - triangle[0][1]) /
  			(triangle[2][1] - triangle[0][1])), triangle[1][1]];
  		fillTriangleFlatBottom([triangle[0], triangle[1], v1], color, contextData);
  		fillTriangleFlatTop([triangle[1], v1, triangle[2]], color, contextData);
  	}
  }
}
