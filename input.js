var input = (function () {
    "use strict";

    function setFileInput(config) {
        config.fileInput.setAttribute("multiple", "");
        config.fileInput.setAttribute("accept", "image/*");
    }

    function uploadEvent(config) {
        config.fileSelectBtn.addEventListener("click", function (e) {
            if (config.fileInput) {
                config.fileInput.click();
            }
        }, false);
    }

    function changeEvent(config) {
        config.fileInput.addEventListener("change", function (e) {
            var that = this;
            filesHandler.handleInput(config, that);
        }, false);
    }

    function initInput(config) {
        setFileInput(config);
        uploadEvent(config);
        changeEvent(config);
    }

    return {
        initInput: initInput
    };
}());