var cover = document.getElementsByClassName("subjectCover");
for(var i = 0; i < cover.length; i++){
    var your_gh = '';
    var delete_href = cover[i].href+'/remove?gh=' + your_gh;
    fetch(delete_href);
}