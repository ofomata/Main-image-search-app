//JavaScript to fetch images from unsplash using api

const accessKey = "5FRLuqOgdKn51gkr7P1HaUYo9WkdNmv7F_xQMXPCsxw";

const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-image");
const searchResult = document.querySelector(".search-result");
const moreButton = document.getElementById("more-button");

let inputData = "";
let page = 1;

async function searchImage() {
    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResult.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-results");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResult.appendChild(imageWrapper);
    });

    page++
    if (page > 1) {
        moreButton.style.display = "block";
    }
}

formElement.addEventListener("submit", (event) =>{
event.preventDefault();
page = 1;
searchImage();
});

moreButton.addEventListener("click", () =>{
    searchImage();
});



//JavaScript to contol the navigation bar

const menu = document.querySelector(".menu");
const close = document.querySelector(".close");
const nav = document.querySelector("nav");

menu.addEventListener("click", () => {
    nav.classList.add("open-nav");
});

close.addEventListener("click", () => {
    nav.classList.remove("open-nav");
});

//JavaScript for the dark mode button

const darkMode = document.getElementById("dark-btn");

darkMode.onclick = function() {
    darkMode.classList.toggle("dark-btn-on");
    document.body.classList.toggle("dark-theme");

    if (localStorage.getItem("theme") === "light") {
        localStorage.setItem("theme", "dark");
    }
    else {
        localStorage.setItem("theme", "light");
    }
}

if (localStorage.getItem("theme") === "light") {
    darkMode.classList.remove("dark-btn-on");
    document.body.classList.remove("dark-theme");
}
else if (localStorage.getItem("theme") === "dark") {
    darkMode.classList.add("dark-btn-on");
    document.body.classList.add("dark-theme");
}
else {
    localStorage.setItem("theme", "light");
}

