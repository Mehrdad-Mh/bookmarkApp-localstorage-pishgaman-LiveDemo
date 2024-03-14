var button = document.querySelector(".save_button")

var siteName = document.querySelector("[name='site_name']");

var url = document.querySelector("[name = 'url']");

var bookmarkPart = document.querySelector('.bookmarks')

//hold book mark in local storage
if(typeof(localStorage.bookmark) == "undefined"){
    localStorage.bookmark = "";
};

button.addEventListener("click" , function(e){

 e.preventDefault();

 let patternURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

 let arrayItems , check = false , adr , itemAdr;

 //validation of form and url

 if(siteName.value === " "){
    alert("site name input is empty");
 }else if(url.value === " "){
    alert('site URL is empty');
 }else if(!patternURL.test(url.value)){
    alert(" Enter a valid URL please soltan");
 }else{
    arrayItems = localStorage.bookmark.split(";");
    adr = url.value;
    adr = adr.replace(/http:\/\/|https:\/\//i , " ");
    arrayItems.length--;


   // check if website is already bookmarked
   for(item of arrayItems){
    itemAdr = item.split(",")[1].replace(/http:\/\/|https:\/\//i,"");
    if(itemAdr == adr){
        check = true;
    }
   }

   if(check == true){
    alert("This website is already bookmarked Sir");
   }else{
    // if all checks are correct and bookmark to local storage
    localStorage.bookmark += `${siteName.value} , ${url.value}`;
    addBookmark(siteName.value , url.value);
   siteName.value = "";
    url.value= "";
   }

 }

});


const addBookmark = (name , url) => {

    let dataLink = url;

    // After obtaining a bookmark, we display it in a div and add
  // a button to visit the link or to delete it

  if(!url.includes("http")){
    url = "//" + url;
  }

  let item = `<div class="bookmark">
       <span>${name}</span>
       <a class="visit" href=${url} target="_blanck"
        data-link="${dataLink}">
         visit </a>
         <a onclick="removeBookmark(this)"
         class="delet" href="#" > Delete </a>
         </div> ` ;

         bookmarkPart.innerHTML += item;

}

// render saved bookmark

(function fetchBookmark() {

   if(typeof(localStorage.bookmark) != "undefined" && localStorage.bookmark !== " " ){

    let arrayItems = localStorage.bookmark.split(";");
    arrayItems.length--;

    for(item of arrayItems){
        let itemSplit = item.split(",");
        addBookmark(itemSplit[0] , itemSplit[1]);
    }

   }

})();

//remove bookmark

function removeBookmark(thisItem){
    let arrayItems = [],
    index,
    item = thisItem.parentNode,
    itemURL = item.querySelector(".visit").dataset.link,
    itemName = item.querySelector("span").innerHTML;

    arrayItems = localStorage.bookmark.split(";")

    for(i in arrayItems){
        if(arrayItems[i] == `${itemName},${itemURL}`){
            index = i;
            break;
        }
    }

  //update the local storage

  index = arrayItems.indexOf(`${itemName},${itemURL}`);

  arrayItems.splice(index,1);
  localStorage.bookmark=arrayItems.join(";");

  //update bookmark part
  bookmarkPart.removeChild(item)

}