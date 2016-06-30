var dragNdrop = (function() {

    function defaults(e) {
        e.stopPropagation();
        e.preventDefault();
    };

    function dragenter(e, config) {
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

    function drop(e, config) {
        defaults(e);
        if (config.dragArea.dragText && config.dragArea.defaultText) {
            config.dragArea.element.value = config.dragArea.defaultText;
        }
        if (config.dragArea.dragId) {
            config.dragArea.element.id = config.dragArea.defaultId || ""; 
        }

        var dt = e.dataTransfer,
        files = dt.files;
        filesHandler.handleFiles(files, config);
    };

    function setDNDEvents(config) {
        config.dragArea.element.addEventListener("dragenter", function (e) {
            dragenter(e, config);
        }, false);  
        config.dragArea.element.addEventListener("dragover", dragover, false);
        config.dragArea.element.addEventListener("drop", function (e) {
            drop(e, config);
        }, false);
    };

    return {
        setDNDEvents: setDNDEvents
    }

})();