const get_label = (url) => {
    const language = url.split("/")[3];
    return (language === "en" ? "Download eBook" : "下載電子書");
};

const get_pdf_url = (url) => {
    const id = url.split("/")[5];
    return "http://taiwanebook.ncl.edu.tw/ebkFiles/" + id + "/" + id + ".PDF";
}

const get_download_btn = (url) => {
    let download_btn = document.createElement("A");
    download_btn.target = "_blank";
    download_btn.href = get_pdf_url(url);
    download_btn.textContent = get_label(url);
    return download_btn
}

let dl_array = document.querySelectorAll('div.extra > a.ui.right.floated');
dl_array.forEach((value, index) => {
    let url = value.href;
    // add download button
    let download_icon = document.createElement("I");
    download_icon.classList.add('right', 'chevron', 'icon');

    let download_btn = get_download_btn(url);
    download_btn.classList.add('ui', 'right', 'floated');
    download_btn.appendChild(download_icon);
    value.parentNode.appendChild(download_btn);
});