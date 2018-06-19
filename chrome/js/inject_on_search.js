const get_label = language => {
  if (language === "en") {
    return "Download eBook";
  } else {
    return "下載電子書";
  }
};

let dl_array = document.querySelectorAll('div.extra > a.ui.right.floated');
dl_array.forEach((value, index) => {
    let url = value.href;
    let id = url.split("/")[5];
    let language = url.split("/")[3];
    let pdf_url = 'http://taiwanebook.ncl.edu.tw/ebkFiles/' + id + '/' + id + '.PDF';
    let label = get_label(language);

    // add download button
    let download_icon = document.createElement("I");
    download_icon.classList.add('right', 'chevron', 'icon');

    let download_btn = document.createElement("A");
    download_btn.classList.add('ui', 'right', 'floated');
    download_btn.target = "_blank";
    download_btn.href = pdf_url;
    download_btn.textContent = label;
    download_btn.appendChild(download_icon);
    value.parentNode.appendChild(download_btn);
});