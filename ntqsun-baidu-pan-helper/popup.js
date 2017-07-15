function sendMessageToBack(){
    // get url list from url_list
    var url_list_text = document.getElementById("url_list").value;
    var all_url_arr = url_list_text.split("\n");
    // send messages to background
    chrome.extension.sendMessage({cmd: "all_url_arr",'arr':all_url_arr},function(response) {});
};

$(document).ready(function(){
   $("#submit").click(function(){ sendMessageToBack(); });
});