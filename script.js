const searchBar = document.querySelector("[data-searchBar]");
const searchInput = document.querySelector("[data-searchInput]");


searchBar.addEventListener("click", ()=>{
    searchInput.focus();
})