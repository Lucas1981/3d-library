export default class Gouraud {
  constructor() {}

  static drawGeneralTriangleGouraudTexture(triangle, texture, contextData) {
		/* Sort the vertices from top (lowest y) to bottom (highest y) */
		triangle.sort((a, b) => a[1] - b[1]);

		/* Get the two X/Y delta's */
		const dxdy1 = (triangle[1][0] - triangle[0][0]) / (triangle[1][1] - triangle[0][1]);
		const dxdy2 = (triangle[2][0] - triangle[0][0]) / (triangle[2][1] - triangle[0][1]);

		let cxl = triangle[0][0];
		let cxr = triangle[0][0];

		const y1 = triangle[0][1];
		const y2 = triangle[1][1];
		const y3 = triangle[2][1];

		/* U V Z positioning */
		const syu1 = triangle[0][5] / triangle[0][7];
		const syv1 = triangle[0][6] / triangle[0][7];
		const syz1 = 1 / triangle[0][7];

		const eyu1 = triangle[1][5] / triangle[1][7];
		const eyv1 = triangle[1][6] / triangle[1][7];
		const eyz1 = 1 / triangle[1][7];

		const syu2 = triangle[0][5] / triangle[0][7];
		const syv2 = triangle[0][6] / triangle[0][7];
		const syz2 = 1 / triangle[0][7];

		const eyu2 = triangle[2][5] / triangle[2][7];
		const eyv2 = triangle[2][6] / triangle[2][7];
		const eyz2 = 1 / triangle[2][7];

		const dyu1 = (eyu1 - syu1) / (y2 - y1);
		const dyu2 = (eyu2 - syu2) / (y3 - y1);

		const dyv1 = (eyv1 - syv1) / (y2 - y1);
		const dyv2 = (eyv2 - syv2) / (y3 - y1);

		const dyz1 = (eyz1 - syz1) / (y2 - y1);
		const dyz2 = (eyz2 - syz2) / (y3 - y1);

		let u, v, z;
		let dxl, dxr;

		/* Sort the proper order of the XY, U, V and Z delta's from left to right */
		if (dxdy1 < dxdy2) {
			dxl = dxdy1;
			dxr = dxdy2;

			dyul = dyu1;
			dyur = dyu2;

			dyvl = dyv1;
			dyvr = dyv2;

			dyzl = dyz1;
			dyzr = dyz2;
		} else {
			dxl = dxdy2;
			dxr = dxdy1;

			dyul = dyu2;
			dyur = dyu1;

			dyvl = dyv2;
			dyvr = dyv1;

			dyzl = dyz2;
			dyzr = dyz1;
		}

		/* Initiate the left starting points for u, v and z */
		let ul = syu1;
		let vl = syv1;
		let zl = syz1;
		let ur = syu1;
		let vr = syv1;
		let zr = syz1;

		/* Loop 1: flat bottom part */
		for (let cy = y1; cy < y2; cy++) {
			const dux = (ur - ul) / (cxr - cxl);
			const dvx = (vr - vl) / (cxr - cxl);
			const dzx = (zr - zl) / (cxr - cxl);

			u = ul;
			v = vl;
			z = zl;

			let contextBase = ((cy * contextData.width) + Math.ceil(cxl)) * 4;
			for (let i = Math.ceil(cxl); i <= Math.ceil(cxr); i++) {
				const tu = u / z;
				const tv = v / z;

				let textureBase = ((Math.floor(tv) * texture.width) + Math.floor(tu)) * 4
				contextData.data[contextBase++] = texture.data[textureBase++];
				contextData.data[contextBase++] = texture.data[textureBase++];
				contextData.data[contextBase++] = texture.data[textureBase];
				contextData.data[contextBase++] = 255;

				u += dux;
				v += dvx;
				z += dzx;
			}

			ul += dyul;
			vl += dyvl;
			zl += dyzl;

			ur += dyur;
			vr += dyvr;
			zr += dyzr;

			cxr += dxr;
			cxl += dxl;
		}

		/* Calculate the XY delta's for the next part.
		   Also: update starting points of X, U, V and Z if this is a flat-top and the first loop was never run */

		if (dxdy1 < dxdy2) {
			dxl = (triangle[2][0] - triangle[1][0]) / (triangle[2][1] - triangle[1][1]);
			cxl = triangle[1][0];
			ul = eyu1;
			vl = eyv1;
			zl = eyz1;
			dyul = (eyu2 - eyu1) / (y3 - y2);
			dyvl = (eyv2 - eyv1) / (y3 - y2);
			dyzl = (eyz2 - eyz1) / (y3 - y2);
		} else {
			dxr = (triangle[2][0] - triangle[1][0]) / (triangle[2][1] - triangle[1][1]);
			cxr = triangle[1][0];
			ur = eyu1;
			vr = eyv1;
			zr = eyz1;
			dyur = (eyu2 - eyu1) / (y3 - y2);
			dyvr = (eyv2 - eyv1) / (y3 - y2);
			dyzr = (eyz2 - eyz1) / (y3 - y2);
		}

		/* Loop 2: flat top part */
		for (let cy = y2; cy < y3; cy++) {
			dux = (ur - ul) / (cxr - cxl);
			dvx = (vr - vl) / (cxr - cxl);
			dzx = (zr - zl) / (cxr - cxl);

			u = ul;
			v = vl;
			z = zl;

			for (let i = Math.ceil(cxl); i <= Math.ceil(cxr); i++) {
				const tu = u / z;
				const tv = v / z;

				const base = ((Math.floor(tv) * texture.width) + Math.floor(tu)) * 4
				contextData.data[(((cy * contextData.width) + i) * 4)] = texture.data[base];
				contextData.data[(((cy * contextData.width) + i) * 4) + 1] = texture.data[base+1];
				contextData.data[(((cy * contextData.width) + i) * 4) + 2] = texture.data[base+2];
				contextData.data[(((cy * contextData.width) + i) * 4) + 3] = 255;

				u += dux;
				v += dvx;
				z += dzx;
			}

			ul += dyul;
			vl += dyvl;
			zl += dyzl;

			ur += dyur;
			vr += dyvr;
			zr += dyzr;

			cxr += dxr;
			cxl += dxl;
		}
	}
}
