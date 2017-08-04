var index = 0;

$("div.extra > a.ui.right.floated").each(function (index) {
    var url = $(this).attr('href');
    var id = url.split("/")[5];
    var language = url.split("/")[3];
    var pdf_url = 'http://taiwanebook.ncl.edu.tw/ebkFiles/' + id + '/' + id + '.PDF';

    if (language == "en") {
        var label = "Download eBook";
    } else {
        var label = "下載電子書";
    }
    
    // add download button
    var download_button_in_search = "<a target='_blank' class='ui right floated' href='" + pdf_url + "'>" + label + "<i class='right chevron icon'></i></a>";
    $("div.extra:eq(" + index + ")").append(download_button_in_search);
    // console.log(index + ": " + $(this).attr('href'));
    index += 1;
});