import Resizer from "react-image-file-resizer";

export const convertToTabletSize = (file: File) =>
new Promise((resolve) => {
    Resizer.imageFileResizer(
    file,
    1280,
    1280,
    "WEBP",
    80,
    0,
    (uri) => {
        resolve(uri);
    },
    "base64"
    );
});

export const convertToCardSize = (file: File) =>
new Promise((resolve) => {
    Resizer.imageFileResizer(
    file,
    500,
    500,
    "WEBP",
    100,
    0,
    (uri) => {
        resolve(uri);
    },
    "base64"
    );
});

export const convertToThumbSize = (file: File) =>
new Promise((resolve) => {
    Resizer.imageFileResizer(
    file,
    170,
    170,
    "WEBP",
    100,
    0,
    (uri) => {
        resolve(uri);
    },
    "base64"
    );
});

export const removePreviewSource = (previewSource: string[], source: string): string[] => {
    // console.log("source ",source);
    
    return previewSource.filter((s) => s !== source)
};

export const removePreviewSourceCard = (previewSource: (string | Blob | ProgressEvent<FileReader>)[], source: string | Blob | ProgressEvent<FileReader>): (string | Blob | ProgressEvent<FileReader>)[] => {
    return previewSource.filter((s) => s !== source)
};