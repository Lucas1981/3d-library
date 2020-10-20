const shade = (v1, d) => {
	const v2 = [];

	v2[0] = Math.min(v1[0] / d * 640, 255);
	v2[1] = Math.min(v1[1] / d * 640, 255);
	v2[2] = Math.min(v1[2] / d * 640, 255);
	v2[3] = v1[3];

	return(v2);
};

export default shade;
