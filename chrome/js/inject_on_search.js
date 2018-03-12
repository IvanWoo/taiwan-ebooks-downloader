var index = 0;

$("div.extra > a.ui.right.floated").each(function (index) {
    var url = $(this).attr('href');
    var id = url.split("/")[5];
    var language = url.split("/")[3];
    var pdf_url = 'http://taiwanebook.ncl.edu.tw/ebkFiles/' + id + '/' + id + '.PDF';
    var label;

    if (language == "en") {
        label = "Download eBook";
    } else {
        label = "下載電子書";
    }
    
    // add download button
    var download_icon = document.createElement("I");
    download_icon.classList.add('right', 'chevron', 'icon');

    var download_btn = document.createElement("A");
    download_btn.classList.add('ui', 'right', 'floated');
    download_btn.target = "_blank";
    download_btn.href = pdf_url;
    download_btn.innerHTML = label;
    download_btn.appendChild(download_icon);

    $("div.extra:eq(" + index + ")").append(download_btn);
    // console.log(index + ": " + $(this).attr('href'));
    index += 1;
});