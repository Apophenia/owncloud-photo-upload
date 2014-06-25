
function showPicture() {
    console.log("Searching device storage");
    var files = navigator.getDeviceStorage('pictures');
    console.log(files);
    var cursor = files.enumerate();
    console.log(cursor);
    var picture = document.getElementById("picture");
    
    cursor.onsuccess = function () {
	console.log("received something from storage");
	var file = this.result;
	console.log("File found: " + file.name);
	if (file !== null) { // any reason not to compare with !== ?
	    var imgSrc = window.URL.createObjectURL(file);
	    var image = "<img height='100' width='100' + src='" + imgSrc + "'>";
	    picture.innerHTML = image;
	}
    }
}	

window.onload = function () { 
    showPicture();
};
