// https://stackoverflow.com/a/38481687
const url = window.location.toString();
const id = url.split("/")[5];
const language = url.split("/")[3];
const pdf_url =
  "http://taiwanebook.ncl.edu.tw/ebkFiles/" + id + "/" + id + ".PDF";

const get_label = (language) => {
    if (language === "en") {
        return "Download eBook";
    } else {
        return "下載電子書";
    }
};

const label = get_label(language)

// add download button
let download_icon = document.createElement("I");
download_icon.classList.add('right', 'chevron', 'icon');

let download_btn = document.createElement("A");
download_btn.classList.add('ui', 'cetered', 'blue', 'button', 'focus_border');
download_btn.target = "_blank";
download_btn.href = pdf_url;
download_btn.textContent = label;
download_btn.appendChild(download_icon);

let book_cover = document.querySelector("div.ui.medium.image");
book_cover.appendChild(download_btn);