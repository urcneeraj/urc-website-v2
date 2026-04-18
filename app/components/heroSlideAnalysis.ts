/** 3×3 grid cell indices for placing hero copy in the visually quietest region. */
export type OverlayGridPos = { x: 0 | 1 | 2; y: 0 | 1 | 2 };

export type HeroOverlayAnalysis = OverlayGridPos & {
  /** Mean luminance of the chosen cell, 0–1 (0 = black, 1 = white). */
  luminance: number;
  /** Lower = emptier / flatter region (good for text). */
  detailScore: number;
};

/**
 * Finds the grid cell with the least visual detail (best for text) and returns
 * its average luminance so foreground can use a contrasting color.
 */
export async function analyzeHeroSlide(src: string): Promise<HeroOverlayAnalysis> {
  const img = new Image();
  img.decoding = "async";
  img.crossOrigin = "anonymous";

  const loaded = new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("failed to load hero slide"));
  });

  img.src = src;
  await loaded;

  const targetW = 300;
  const targetH = 170;

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    return { x: 2, y: 0, luminance: 0.15, detailScore: 0 };
  }

  const srcAspect = img.naturalWidth / Math.max(1, img.naturalHeight);
  const dstAspect = targetW / targetH;

  let sx = 0;
  let sy = 0;
  let sw = img.naturalWidth;
  let sh = img.naturalHeight;

  if (srcAspect > dstAspect) {
    sw = Math.round(img.naturalHeight * dstAspect);
    sx = Math.round((img.naturalWidth - sw) / 2);
  } else if (srcAspect < dstAspect) {
    sh = Math.round(img.naturalWidth / dstAspect);
    sy = Math.round((img.naturalHeight - sh) / 2);
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH);

  const imageData = ctx.getImageData(0, 0, targetW, targetH);
  const d = imageData.data;

  const regions = 3;
  const cellW = Math.floor(targetW / regions);
  const cellH = Math.floor(targetH / regions);

  let best: HeroOverlayAnalysis = { x: 2, y: 0, luminance: 0.2, detailScore: Infinity };

  for (let ry = 0; ry < regions; ry++) {
    for (let rx = 0; rx < regions; rx++) {
      const x0 = rx * cellW;
      const y0 = ry * cellH;
      const x1 = rx === regions - 1 ? targetW : x0 + cellW;
      const y1 = ry === regions - 1 ? targetH : y0 + cellH;

      let n = 0;
      let sum = 0;
      let sumSq = 0;
      let gradSum = 0;
      let lumSum = 0;

      for (let y = y0 + 1; y < y1 - 1; y++) {
        for (let x = x0 + 1; x < x1 - 1; x++) {
          const i = (y * targetW + x) * 4;
          const r = d[i] ?? 0;
          const g = d[i + 1] ?? 0;
          const b = d[i + 2] ?? 0;
          const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

          const iR = i + 4;
          const iL = i - 4;
          const iD = i + targetW * 4;
          const iU = i - targetW * 4;

          const lumR =
            (0.2126 * (d[iR] ?? 0) + 0.7152 * (d[iR + 1] ?? 0) + 0.0722 * (d[iR + 2] ?? 0)) / 255;
          const lumL =
            (0.2126 * (d[iL] ?? 0) + 0.7152 * (d[iL + 1] ?? 0) + 0.0722 * (d[iL + 2] ?? 0)) / 255;
          const lumD =
            (0.2126 * (d[iD] ?? 0) + 0.7152 * (d[iD + 1] ?? 0) + 0.0722 * (d[iD + 2] ?? 0)) / 255;
          const lumU =
            (0.2126 * (d[iU] ?? 0) + 0.7152 * (d[iU + 1] ?? 0) + 0.0722 * (d[iU + 2] ?? 0)) / 255;

          const gx = lumR - lumL;
          const gy = lumD - lumU;
          const grad = Math.abs(gx) + Math.abs(gy);

          n++;
          sum += lum;
          sumSq += lum * lum;
          gradSum += grad;
          lumSum += lum;
        }
      }

      if (n === 0) continue;
      const mean = sum / n;
      const variance = Math.max(0, sumSq / n - mean * mean);
      const gradMean = gradSum / n;
      const posBias = 0.06 * (ry === 2 ? 1 : 0) + 0.02 * (rx === 1 ? 1 : 0);
      const detailScore = gradMean + Math.sqrt(variance) + posBias;
      const cellLum = lumSum / n;

      if (detailScore < best.detailScore) {
        best = {
          x: rx as 0 | 1 | 2,
          y: ry as 0 | 1 | 2,
          luminance: cellLum,
          detailScore,
        };
      }
    }
  }

  return best;
}
