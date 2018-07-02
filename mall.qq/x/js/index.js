/*导航样式*/
var ul = document.getElementById("nav-ul");
var lis = ul.getElementsByTagName("li");
console.log(lis);
for (var i = 1; i < lis.length; i++) {
    lis[i].onmouseover = function () {
        for (var j = 1; j < lis.length; j++) {
            lis[j].className = "";
        }
        this.className = 'active';
    };
    lis[i].onmouseout = function () {
        for (var j = 1; j < lis.length; j++) {
            lis[j].className = "";
        }
    }
}
/*微信二维码显示*/
var iconWeixin = document.getElementById("weixin");
var weixinCode = document.getElementById("weixin-code");
iconWeixin.onmouseover = function () {
    weixinCode.style.display = 'block';
};
iconWeixin.onmouseout = function () {
    weixinCode.style.display = 'none';
};
/*弹出模态框*/
var loginBtnTop = document.getElementById("login-btn-top");
var greyDiv = document.getElementById('grey');
var loginPage = document.getElementById('login-page');
var closeButton = document.getElementById('close');
loginBtnTop.onclick = function () {
    showModal();
    showLogInDiv();
};
function showModal() {
    greyDiv.style.display = 'block';
    loginPage.style.display = 'block';
}
/*关闭模态框*/
closeButton.onclick = function () {
    loginPage.style.display = 'none';
    setTimeout(closegeryDiv, 200);
};
function closegeryDiv() {
    greyDiv.style.display = 'none';
}
/*登录验证*/
var tips = document.getElementsByClassName('test-promp');
document.getElementsByName('username')[0].onblur = function () {
    tips[1].style.display = 'none';
    var value = this.value;
    if (value.length == 0) {
        tips[2].style.display = 'block';
    } else {
        tips[2].style.display = 'none';
    }
};
document.getElementsByName('password')[1].onblur = function () {
    tips[2].style.display = 'none';
    if (this.value.length == 0) {
        tips[1].style.display = 'block';
    } else {
        tips[1].style.display = 'none';
    }
};
/*模态框内注册界面与登录切换显示*/
var loginDiv = document.getElementById('login');
var regDiv = document.getElementById('regesiter');
function showLogInDiv() {
    regDiv.style.display = 'none';
    loginDiv.style.display = 'block';
}
function showRegDiv() {
    regDiv.style.display = 'block';
    loginDiv.style.display = 'none';
}
document.getElementById('reg-href').onclick = showRegDiv;
document.getElementById('log-href').onclick = showLogInDiv;
document.getElementById('login-pen').onclick = function () {
    showModal();
    showLogInDiv();
};
/*注册验证*/
var regTips = document.getElementsByClassName('prompt');
document.getElementsByName('nickname')[0].onblur = function () {
    regTips[1].style.display = 'none';
    if (this.value.length == 0) {
        regTips[0].style.display = 'block';
    }
    else {
        regTips[0].style.display = 'none';
    }
};
/*手机号格式验证*/
document.getElementsByName('mobile')[0].onblur = function () {
    var mobileReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    regTips[0].style.display = 'none';
    if (!mobileReg.test(this.value)) {
        regTips[1].style.display = 'block';
    } else {
        regTips[1].style.display = 'none';
    }
};
document.getElementsByName('password')[0].onblur = function () {
    regTips[0].style.display = 'none';
    regTips[1].style.display = 'none';
    if (this.value == 0) {
        regTips[2].style.display = 'block';
    } else {
        regTips[2].style.display = 'none';
    }
};
/*加载更多*/
var wsList = document.getElementsByClassName('ws-list')[0];
var item = document.getElementsByClassName('ws-item')[0];
document.getElementById('loading').onclick = function () {
    var moreHtml = item.cloneNode(true);
    wsList.appendChild(moreHtml);
};

