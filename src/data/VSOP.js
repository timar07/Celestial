import { Vector3 } from 'three';
import { AU, KM } from '../Constants';

const prec = 0;
const dpi = 6.283185307179586;
const a1000 = 365250;
const k = 0;
export const J2000 = 2451545;

export function VSOP(jd) {

	const r = [0, 0, 0, 0, 0, 0];

	const t = [1];
	t[1] = (jd - J2000) / a1000;
	for (let i = 2; i <= 5; i++) {
		t[i] = t[1] * t[i - 1];
	}

	const q = Math.max(3, -Math.log10(prec + 1e-50));

	window.vsop.earth.forEach(params => {
		const { it, ic, series } = params;

		const t0 = t[it] || 0;
		const t1 = t[it - 1] || 0;
		const p = prec / 10 / (q - 2) / (Math.abs(t0) + it * Math.abs(t1) * 1e-4 + 1e-50);
		const n = series.length;
		// console.log(it, ic);
		for (let i = 0; i < n; i++) {

			const a = series[i][0];
			const b = series[i][1];
			const c = series[i][2];
			
			// console.log(series[i].length);

			if (Math.abs(a) < p) {
				break;
			}
			const u = b + c * t[1];
			const cu = Math.cos(u);
			r[ic] += a * cu * t[it];
			const su = Math.sin(u);
			r[ic + 3] = r[ic + 3] + t[it - 1] * it * a * cu - t[it] * a * c * su;
		}

	});

	for (let i = 4; i <= 6; i++) {
		r[i] /= a1000;
	}
	r[k] %= dpi;
	if (r[k] < 0) r[k] += dpi;
	
	return new Vector3(r[1] * AU, r[2] * AU, r[3] * AU);
}