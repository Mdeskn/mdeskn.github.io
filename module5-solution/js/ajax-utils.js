(function (global) {

    // Convenience function for inserting innerHTML for 'select'
    var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    // The actual AJAX request
    function getRequestObject() {
        if (window.XMLHttpRequest) {
            return (new XMLHttpRequest());
        } else {
            global.alert("Ajax is not supported!");
            return (null);
        }
    }

    // Makes an AJAX GET request to 'requestUrl'
    function sendRequest(requestUrl, responseHandler, isJson) {
        var request = getRequestObject();
        request.onreadystatechange = function () {
            handleResponse(request, responseHandler, isJson);
        };
        request.open("GET", requestUrl, true);
        request.send(null); // for POST only
    }

    // Only calls user provided 'responseHandler'
    // function if response is ready
    // and not an error
    function handleResponse(request, responseHandler, isJson) {
        if ((request.readyState == 4) && (request.status == 200)) {
            // Default to isJson being true
            if (isJson == undefined) {
                isJson = true;
            }

            if (isJson) {
                responseHandler(JSON.parse(request.responseText));
            } else {
                responseHandler(request.responseText);
            }
        }
    }

    // Expose utility to the global object
    global.$ajaxUtils = {
        sendGetRequest: sendRequest,

        // Add a new function for JSONP requests
        sendJsonpRequest: function (url, callback) {
            var script = document.createElement('script');
            script.src = url + '?callback=' + callback.name;
            document.body.appendChild(script);
        }
    };

})(window);
