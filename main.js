/** @type {HTMLCanvasElement | null} */
const canvas = document.getElementById("canvas");
const copy = document.getElementById("copy");
if (!canvas || !copy) {
  throw new Error("Elements not found");
}
const ctx = canvas.getContext("2d");
if (!ctx) {
  throw new Error("Canvas context not found");
}

document.addEventListener("paste", (e) => {
  handlePaste(e);
  e.preventDefault();
});

copy.addEventListener("click", () => {
  canvas.toBlob((blob) => {
    const data = [new ClipboardItem({ "image/png": blob })];
    navigator.clipboard.write(data);
  });
});

/**
 * Handle the paste event
 * @param {ClipboardEvent} e
 * @returns
 */
function handlePaste(e) {
  if (!e.clipboardData) {
    return;
  }
  const blob = getFirstImageData(e.clipboardData);
  if (!blob) {
    return;
  }
  const imageUrl = URL.createObjectURL(blob);

  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    addStandWithIsrael(ctx, img.width, img.height);
  };
  img.src = imageUrl;
}

/**
 *
 * @param {DataTransfer} transferData
 * @returns
 */
function getFirstImageData({ items }) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.includes("image")) {
      return items[i].getAsFile();
    }
  }
  return null;
}

const PADDING_BOTTOM = 40;
/**
 * Add "I Stand With Israel 🇮🇱 text onto the canvas"
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 */
function addStandWithIsrael(ctx, width, height) {
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.font = "bold 100px sans-serif";

  const text = "🇮🇱 I STAND WITH ISRAEL 🇮🇱";

  ctx.fillText(text, width / 2, height - PADDING_BOTTOM, width * 0.75);
  ctx.strokeText(text, width / 2, height - PADDING_BOTTOM, width * 0.75);
}
