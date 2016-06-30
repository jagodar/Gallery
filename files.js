var filesHandler = (function () {
    "use strict";
    function handleInput(config, that) {
        var files = that.files;
        handleFiles(files, config);
    }

    function handleFiles(files, config) {
        var file;
        for (var i = 0; i < files.length; i++) {
            file = files[i];
            thumbnails.createThumbnail(file, config);
        }
    }

    function readFile(img, file) {
        var reader = new FileReader();
        reader.onload = (function(aImg) {
                            return function(e) { 
                                aImg.src = e.target.result; 
                            }; 
                        })(img);
        reader.readAsDataURL(file);     
    }

    return {
        handleInput: handleInput,
        handleFiles: handleFiles,
        readFile: readFile
    };
}());