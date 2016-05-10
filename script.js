(function () {

	// Function constructor
	function Sandbox() {
		// Change arguments to array
		var args = Array.prototype.slice.call(arguments),
		// Pop callback function
			callback = args.pop(),
		// Handle passed modules as a string or an array
			modules = (args[0] && typeof args[0] === "string") ? args : args[0],
			modulesLength = modules.length,
			i;

		// Handle calling constructor without 'new'
		if (!(this instanceof Sandbox)) {
			return new Sandbox(modules, callback);
		}

		// Initialize modules with 'this'
		for (i = 0; i < modulesLength; i++) {
			Sandbox.modules[modules[i]](this);
		}

		// Invoke callback
		callback(this);
	}

	// Modules
	Sandbox.modules = {};

	Sandbox.modules.input = function input(box) {
		// Dependencies 
		var fileSelectBtn = document.querySelector(".fileSelect"),
			fileInput = document.querySelector(".fileInput");

		// Set attributes of file input 
		box.setFileInput = function setFileInput() {
			fileInput.setAttribute("multiple", "");
			fileInput.setAttribute("accept", "image/*");
		};

		// Links upload button and file input by click event
		box.uploadEvent = function uploadEvent() {
			fileSelectBtn.addEventListener("click", function (e) {
				if (fileInput) {
					fileInput.click();
				}
			}, false);
		};

		// Wait for new files on input
		box.changeEvent = function changeEvent() {
			fileInput.addEventListener("change", box.inputHandle, false);
		};
	};

	Sandbox.modules.dragNdrop = function dragNdrop(box) {
		// Dependencies
		var dragArea = document.querySelector(".fileSelect"),
			dt, 
			files,
		// Private functions
			dragenter = function dragenter(e) {
				e.stopPropagation();
				e.preventDefault();
				dragArea.value = "Drop";
				dragArea.id = "dropbox";
			},
			dragover = function dragover(e) {
				e.stopPropagation();
				e.preventDefault();
			},
			drop = function drop(e) {
				e.stopPropagation();
				e.preventDefault();
				dragArea.value = "Upload";
				dragArea.id = "";

				dt = e.dataTransfer,
				files = dt.files;
				box.filesHandle(files);
			};

		// Set events
		box.setDNDEvents = function setDNDEvents() {
			dragArea.addEventListener("dragenter", dragenter, false);	
			dragArea.addEventListener("dragover", dragover, false);
			dragArea.addEventListener("drop", drop, false);
		};
	};

	Sandbox.modules.thumbnails = function thumbnails(box) {

		// Create thumbnail element 
		box.thumbnailCreate = function thumbnailCreate(file) {
			var img = document.createElement("img");
			img.file = file;
			img.setAttribute("class", "thumbnail");
			document.body.appendChild(img);
			box.fileRead(img, file);
			box.thumbnailOnClick(img);
		};

		// Make thumbnails clickable
		box.thumbnailOnClick = function thumbnailOnClick(img) {
			img.addEventListener("click", function () {
				window.open(this.src);
			}, false);
		}
	};

	Sandbox.modules.filesHandler = function filesHandler(box) {

		// Iterate through files 
		box.filesHandle = function filesHandle(files) {
			var i,
				file;
			for (i = 0; i < files.length; i++) {
				file = files[i];
				box.thumbnailCreate(file);
			}
		};

		// File reader 
		box.fileRead = function fileRead(img, file) {
			var reader = new FileReader();
    		reader.onload = (function(aImg) {
    							return function(e) { 
    								aImg.src = e.target.result; 
    							}; 
    						})(img);
    		reader.readAsDataURL(file);		
		};

		// Callback for input's change listener
		box.inputHandle = function inputHandle() {
			var files = this.files;
			box.filesHandle(files);
		};
	};

	// Constructor call
	new Sandbox(["input", "dragNdrop", "thumbnails", "filesHandler"], function (box) {
		box.setFileInput();
		box.uploadEvent();
		box.setDNDEvents();
		box.changeEvent();
	});
})();