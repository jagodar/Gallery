var filesHandler = function (config) {

	function handleInput() {
		var files = this.files;
		handleFiles(files, config);
	};

	function handleFiles(files) {
		var file;
		for (var i = 0; i < files.length; i++) {
			file = files[i];
			thumbnails.createThumbnail(file);
		}
	};

	function readFile(img, file) {
		var reader = new FileReader();
		reader.onload = (function(aImg) {
							return function(e) { 
								aImg.src = e.target.result; 
							}; 
						})(img);
    	reader.readAsDataURL(file);		
	};

	return {
		handleInput: handleInput,
		handleFiles: handleFiles,
		readFile: readFile
	}
};

var input = function(config) {

	function setFileInput() {
		config.fileInput.setAttribute("multiple", "");
		config.fileInput.setAttribute("accept", "image/*");
	};

	function uploadEvent() {
		config.fileSelectBtn.addEventListener("click", function (e) {
			if (config.fileInput) {
				config.fileInput.click();
			}
		}, false);
	};

	function changeEvent() {
		config.fileInput.addEventListener("change", filesHandler.handleInput, false);
	};

	function initInput() {
		setFileInput();
		uploadEvent();
		changeEvent();
	};

	return {
		initInput: initInput
	}
};

var dragNdrop = function(config) {

	function defaults(e) {
		e.stopPropagation();
		e.preventDefault();
	};

	function dragenter(e) {
		defaults(e);
		if (config.dragArea.dragText && config.dragArea.defaultText) {
			config.dragArea.element.value = config.dragArea.dragText;
		}
		if (config.dragArea.dragId) {
			config.dragArea.element.id = config.dragArea.dragId;
		}
	};

	function dragover(e) {
		defaults(e);
	};

	function drop(e) {
		defaults(e);
		if (config.dragArea.dragText && config.dragArea.defaultText) {
			config.dragArea.element.value = defaultText;
		}
		if (config.dragArea.dragId) {
			config.dragArea.element.id = config.dragArea.defaultId || ""; 
		}

		var dt = e.dataTransfer,
		files = dt.files;
		filesHandler.handleFiles(files);
	};

	function setDNDEvents() {
		config.dragArea.element.addEventListener("dragenter", dragenter, false);	
		config.dragArea.element.addEventListener("dragover", dragover, false);
		config.dragArea.element.addEventListener("drop", drop, false);
	};

	return {
		setDNDEvents: setDNDEvents
	}

};

var thumbnails = function(config) {

	function thumbnailOnClick(img) {
		img.addEventListener("click", function () {
			window.open(this.src);
		}, false);
	};

	function createThumbnail(file) {
		var img = document.createElement("img");
		img.file = file;
		if (config.thumbnail.attribute && config.thumbnail.attributeName) {
			img.setAttribute(config.thumbnail.attribute, config.thumbnail.attributeName);
		}
		img.style.width = config.thumbnail.width;
		img.style.height = config.thumbnail.height;
		config.galleryArea.appendChild(img);
		filesHandler.readFile(img, file);
		thumbnailOnClick(img);
	};

	return {
		createThumbnail: createThumbnail
	}

};


(function() {
	var config = {
		fileInput: document.querySelector(".fileInput"),
		fileSelectBtn: document.querySelector(".fileSelect"),
		dragArea: {
			element: document.querySelector(".fileSelect"),
			dragText: "Drop",
			defaultText: "Upload",
			dragId: "dropbox",
			defaultId: ""
		},
		thumbnail: {
			attribute: "class",
			attributeName: "thumbnail",
			width: "150px",
			height: "150px"
		},
		galleryArea: document.body
	};
	thumbnails(config);
	dragNdrop(config);
	filesHandler(config);
	input(config);
	// input.initInput();
	dragNdrop.setDNDEvents();
})();