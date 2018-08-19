var loginBtn = document.getElementsByTagName("input")[2]
var registerBtn = document.getElementsByTagName("input")[3]
var usernameInput = document.getElementsByTagName("input")[0]
var passwordInput = document.getElementsByTagName("input")[1]
function sendMessage(route,message){
    var username = usernameInput.value;
    var password = passwordInput.value;
    //需要把用户名和密码通过ajax(post)发送给后台
    var xhr = new  XMLHttpRequest();
    xhr.open("post","http://127.0.0.1:8888/"+route);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(`username=${username}&password=${password}`);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.responseText=="1"){
                alert(message)
            }else{
                alert("失败了，请重试！")
            }
        }
    }
}
loginBtn.onclick=function(){
    sendMessage("login","登录成功!")
};

registerBtn.onclick=function(){
    sendMessage("register","注册成功!")
};