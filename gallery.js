
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
	if (file != null) { // consider possible equality situations here
	    var image = "<img height='100' width='100'>";
	    image.src = window.URL.createObjectURL(file);
	    picture.innerHTML = image;
	}
    }
}	

window.onload = function () { 
    showPicture();
};
