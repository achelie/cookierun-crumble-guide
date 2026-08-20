export type ShareImageResult = "shared" | "downloaded" | "cancelled";

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

export async function shareNodeAsPng(node: HTMLElement, filename: string): Promise<ShareImageResult> {
  await document.fonts?.ready;
  await waitForImages(node);
  const { toBlob } = await import("html-to-image");
  const blob = await toBlob(node, {
    backgroundColor: "#f3ecdf",
    cacheBust: true,
    pixelRatio: 1,
  });

  if (!blob) throw new Error("The image could not be generated.");

  const file = new File([blob], filename, { type: "image/png" });
  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: "CookieRun: Crumble build" });
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return "cancelled";
    }
  }

  downloadBlob(blob, filename);
  return "downloaded";
}
