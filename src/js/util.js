import CONFIG from './config.json';
export function getPhotoURLs (photoProperties) {
	let base = CONFIG.photos.urlBase;
	let lakeName = photoProperties["GREATLAKE"].replace(/ /gi, "");
	let year = photoProperties["YEAR_"];
	let fileName = photoProperties["FILENAME"];
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
	console.log(urls);
	return urls;
}