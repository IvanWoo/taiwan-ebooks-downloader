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

const main = () => {
    if (window.location.toString().split("/")[4] === "book") {
        const url = window.location.toString();
        let download_icon = document.createElement("I");
        let download_btn = get_download_btn(url);
        download_btn.appendChild(download_icon);

        if (url.split("/").length === 6) {
            // on book page
            download_icon.classList.add("right", "chevron", "icon");
            download_btn.classList.add("ui", "cetered", "blue", "button", "focus_border");
            let book_cover = document.querySelector("div.ui.medium.image");
            book_cover.appendChild(download_btn);
        } else if (url.split("/").length === 7) {
            // on book reader page
            download_icon.classList.add("right", "arrow", "icon");
            download_btn.classList.add("ui", "labeled", "icon", "button", "focus_border");
            let btn_column = document.querySelector(
                "body > main > main > div > div:nth-child(1) > div.ui.three.wide.computer.three.wide.tablet.sixteen.wide.mobile.column"
            );
            btn_column.appendChild(download_btn);
        }
    } else {
        // on search page
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
    }
}

// kick off
main();