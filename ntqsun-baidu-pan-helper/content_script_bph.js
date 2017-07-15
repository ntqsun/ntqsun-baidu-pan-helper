chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.cmd == "one_url_arr"){
        var password = request.arr[1];
        document.getElementById('accessCode').value = password;
        /*
        Due to browser extension sand-boxing, and basic jQuery functionality,
        you cannot trigger a non-jQuery click event with trigger or click.
        You can however call the raw DOM element click method,
        which will act exactly as if the element was clicked with the mouse.
        Just use [0] to access the DOM element.
        http://stackoverflow.com/questions/17819344/triggering-a-click-event-from-content-script-chrome-extension
        */
        $("[data-button-id='b1']")[0].click();
    }
});

$(document).ready(function() {
    save_file()
});

async function save_file() {
    var needCode = document.getElementById('accessCode');
    if(needCode == null){
        if($(".icon-save-disk").length >= 1){
            $("[data-button-id='b1']")[0].click();
            await sleep(5000);
            $("[data-button-id='b15']")[0].click();
            await sleep(8000);
            chrome.extension.sendMessage({cmd: "close_tab"},function(response) {});
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};