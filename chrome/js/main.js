chrome.tabs.query({
    'active': true,
    'lastFocusedWindow': true
}, function (tabs) {
    var url = tabs[0].url;
    var id = url.split("/")[5];
    var language = url.split("/")[3];
    var pdf_url = 'http://taiwanebook.ncl.edu.tw/ebkFiles/' + id + '/' + id + '.PDF';

    if (language == "en") {
        var label = "Download eBook";
    } else {
        var label = "下載電子書";
    }

    var download_button = "<a class='ui cetered blue button focus_border' href='" + pdf_url + "'>" + label + "<i class='right chevron icon'></i></a>"
    var download_button_on_reader_page = "<a class='ui labeled icon button focus_border' href='" + pdf_url + "'>" + label + "<i class='right chevron icon'></i></a>"
    $("div.ui.medium.image").append(download_button);
    $("body > main > main > div > div:nth-child(1) > div.ui.three.wide.computer.three.wide.tablet.sixteen.wide.mobile.column").append(download_button_on_reader_page)
    Console.log("load sucessfully!")
});