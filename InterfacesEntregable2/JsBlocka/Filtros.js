
export class Filtros {
  static negativo(ctx, canvas) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {

      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    ctx.putImageData(imageData, 0, 0);
  }

  // valor positivo = más brillo, negativo = más oscuro
  static brillo(ctx, canvas, valor = 50) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] += valor;     // Uint8ClampedArray recorta solo a 0-255
      data[i + 1] += valor;
      data[i + 2] += valor;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  static grises(ctx, canvas) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      // Fórmula perceptual BT.601
      const gris = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];

      data[i] = gris;
      data[i + 1] = gris;
      data[i + 2] = gris;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  static blur(ctx, canvas, ventana = 5, vueltas) {

    const radio = Math.floor(ventana / 2);
    const width = canvas.width;
    const height = canvas.height;
    
    for (let v = 0; v <= vueltas; v++) {
      const origen = ctx.getImageData(0, 0, width, height);
      const destino = ctx.createImageData(width, height);
      const src = origen.data;
      const dst = destino.data;
      
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let r = 0, g = 0, b = 0, cantidad = 0;

          for (let dy = -radio; dy <= radio; dy++) {
            for (let dx = -radio; dx <= radio; dx++) {
              const nx = x + dx;
              const ny = y + dy;

              if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;

              const indiceVecino = (nx + ny * width) * 4;
              r += src[indiceVecino];
              g += src[indiceVecino + 1];
              b += src[indiceVecino + 2];
              cantidad++;
            }
          }
          const indice = (x + y * width) * 4;
          dst[indice] = r / cantidad;
          dst[indice + 1] = g / cantidad;
          dst[indice + 2] = b / cantidad;
          dst[indice + 3] = src[indice + 3];
        }
      }
      ctx.putImageData(destino, 0, 0);
    }

  }
}