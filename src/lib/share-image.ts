async function waitForImages(node: HTMLElement) {
  const images = Array.from(node.querySelectorAll("img"));
  await Promise.all(images.map(async (image) => {
    if (image.complete) return;
    await Promise.race([
      image.decode().catch(() => undefined),
      new Promise<void>((resolve) => window.setTimeout(resolve, 4000)),
    ]);
  }));
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.download = filename;
  anchor.href = url;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function downloadNodeAsPng(node: HTMLElement, filename: string): Promise<void> {
  await document.fonts?.ready;
  await waitForImages(node);
  const { toBlob } = await import("html-to-image");
  const blob = await toBlob(node, {
    backgroundColor: "#f3ecdf",
    cacheBust: true,
    pixelRatio: 1,
  });

  if (!blob) throw new Error("The image could not be generated.");

  downloadBlob(blob, filename);
}
