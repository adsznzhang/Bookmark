//listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);
function saveBookmark(e){
    //console.log("It works");

    var siteName = document.getElementById("siteName").value;
    var siteUrl = document.getElementById("siteUrl").value;


    var bookmark = {
        name: siteName,
        url: siteUrl
    };
    /*
    //local storage text
    localStorage.setItem("test", "Hellow World");
    console.log(localStorage.getItem("test"));
    localStorage.removeItem("test");
     */

    if(localStorage.getItem("bookmarks") === null){
        //
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify( bookmarks));
    }else {
        //get bookmarks from Localstorage
       bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks",JSON.stringify( bookmarks));
    }


  fetchBookmarks();
  //prevent form from submitting
    e.preventDefault();
}


//Delete bookmark
function deletBookmarks(url){
  //get bookmarks from localstorage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  //loop throught bookmarks
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      //remove from array
      bookmarks.splice(i,1);
    }
  }
  //reset back to localstorage
  localStorage.setItem("bookmarks",JSON.stringify( bookmarks));
  fetchBookmarks();
}

//fetch bookmarks

function fetchBookmarks(){
  //get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  //get output id
  var bookmarksResults = document.getElementById("bookmarksResults");

  //build output

  bookmarksResults.innerHTML = "";
    for(var i = 0;i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">'+
            '<h3>'+name+
                                      ' <a class="btn btn-default" target="-blank" href="'+url+'">Vist</a>'+
                                      ' <a onclick="deletBookmarks(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a>'+
      '</h3>'+
                                      '</div>';
    }
}
