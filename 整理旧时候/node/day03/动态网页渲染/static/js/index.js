function del(id){
 const xhr=new XMLHttpRequest();
 xhr.open('get','http://127.0.0.1:8888/del?id='+id);
 xhr.send();
 xhr.onreadystatechange=function(){
   if(xhr.readyState==4){
     console.log(window.location);
     window.location=window.location;
   }
 };
}
function play(title){
const video=document.getElementsByTagName('audio')[0];
video.src="http://127.0.0.1:8888/"+title+".mp3";
}