var url = $("div.ui.container > form.ui.form > div.field:first > input.report").attr('value');
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
download_icon.classList.add('right', 'arrow', 'icon');

var download_btn = document.createElement("A");
download_btn.classList.add('ui', 'labeled', 'icon', 'button', 'focus_border');
download_btn.target = "_blank";
download_btn.href = pdf_url;
download_btn.textContent = label;
download_btn.appendChild(download_icon);

$("body > main > main > div > div:nth-child(1) > div.ui.three.wide.computer.three.wide.tablet.sixteen.wide.mobile.column").append(download_btn)

// console.log("Taiwan eBooks Downloader load successfully!")