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

    input.initInput(config);
    dragNdrop.setDNDEvents(config);
})();