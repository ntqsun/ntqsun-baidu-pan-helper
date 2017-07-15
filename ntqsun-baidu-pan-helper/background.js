chrome.extension.onMessage.addListener(async function(request, sender, sendResponse) {
    if(request.cmd == 'all_url_arr'){
        var len = request.arr.length;
        for(var i=0;i<len;i++){
            if(i != 0){
                await sleep(30000);
            }
            var url_pass_array=[];
            var one_row = request.arr[i] ;
            var one_url_arr = one_row.split(",");
            chrome.tabs.create({url: one_url_arr[0] ,active:false },async function (tab) {
                var tab_id = tab.id;
                await sleep(10000);
                // send message to content script
                chrome.tabs.sendMessage(tab_id, {cmd: "one_url_arr",'arr':one_url_arr}, function(response) {});
            });
        }
    }
    if(request.cmd == 'close_tab'){
        var process_id = sender.tab.id;
        /*
        Most likely you're running your code from a content script, where chrome.tabs is undefined.
        If this is the case, you can instead send a message to the background page and have the background page (which has access to chrome.tabs) make the call.
        Note that from a background page, you would use chrome.tabs.getSelected since getCurrent will return undefined.
        http://stackoverflow.com/questions/8104973/how-to-close-the-current-extension-tab
        */
        chrome.tabs.remove(process_id, function() { });
    }
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};