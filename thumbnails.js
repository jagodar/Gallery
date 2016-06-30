var thumbnails = (function() {

    function thumbnailOnClick(img) {
        img.addEventListener("click", function () {
            window.open(this.src);
        }, false);
    };

    function createThumbnail(file, config) {
        var img = document.createElement("img");
        img.file = file;
        if (config.thumbnail.attribute && config.thumbnail.attributeName) {
            img.setAttribute(config.thumbnail.attribute, config.thumbnail.attributeName);
        }
        img.style.width = config.thumbnail.width || "150px";
        img.style.height = config.thumbnail.height || "150px";
        config.galleryArea.appendChild(img);
        filesHandler.readFile(img, file);
        thumbnailOnClick(img);
    };

    return {
        createThumbnail: createThumbnail
    }

})();