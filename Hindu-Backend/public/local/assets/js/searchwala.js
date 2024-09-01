let dropdownBtnText = document.getElementById("drop-text");
let span = document.getElementById("span");
let icon = document.getElementById("icon");
let list = document.getElementById("list");
let input = document.getElementById("search-input");
let listItems = document.querySelectorAll(".dropdownx-list-item");

dropdownBtnText.onclick = function () {
  list.classList.toggle("show");
  icon.style.transform = list.classList.contains("show") ? "rotate(-180deg)" : "rotate(0deg)";
};

window.onclick = function (e) {
  if (!dropdownBtnText.contains(e.target) && !list.contains(e.target)) {
    list.classList.remove("show");
    icon.style.transform = "rotate(0deg)";
  }
};

listItems.forEach(item => {
  item.onclick = function (e) {
    span.innerText = e.target.innerText;
    input.placeholder = e.target.innerText === "Everything" ? "Search anything..." : `Search in ${e.target.innerText}...`;
    list.classList.remove("show");
    icon.style.transform = "rotate(0deg)";
  };
});
