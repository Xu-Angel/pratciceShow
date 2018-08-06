var inp=document.getElementsByTagName('input')[0];
inp.onchange=function () {
    var filename=inp.value;
    var fix=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();
    console.log(fix);
 /*   if(fix=='jpg'||fix=='jpeg'||fix=='png'||fix=='gif'){
        alert('t');
    }else {
        alert('f');
    }*/
}
