import CONFIG from './config.json';

export function getPhotoURLs (photoProperties) {
    let base = CONFIG.photos.urlBase;
    let lakeName = photoProperties["Great Lake"].replace(/ /gi, "");
    let year = photoProperties["Year"];
    let fileName = photoProperties["File Name"];
    let urls = {};
    for (let size in CONFIG.photos.sizes) {
        let sizeDir = CONFIG.photos.sizes[size];
        let modifiedFilename = fileName;
        if(size !== "original") {
            let parts = fileName.split(".");
            parts[0] += "_" + sizeDir;
            modifiedFilename = parts.join(".");
        } 
        urls[size] = [base,lakeName,year,sizeDir,modifiedFilename].join("/");
    }
    return urls;
}
