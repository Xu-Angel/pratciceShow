(function() {
    var newRem = function() {
        var html = document.documentElement;
        if(getClientHeight()>getClientWidth()){
            html.style.fontSize = html.getBoundingClientRect().width /750*100 + 'px';
        }else{
            html.style.fontSize = html.getBoundingClientRect().width /1334*100 + 'px';
        }
    };
    newRem();

    // 取窗口可视范围的高度
    function getClientHeight()
    {
        var clientHeight=0;
        if(document.body.clientHeight&&document.documentElement.clientHeight)
        {
            var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
        }
        else
        {
            var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
        }
        return clientHeight;
    }

    // 取窗口可视范围的宽度
    function getClientWidth()
    {
        var clientWidth=0;
        if(document.body.clientWidth&&document.documentElement.clientWidth)
        {
            var clientWidth = (document.documentElement.clientWidth<document.body.clientWidth)?document.body.clientWidth:document.documentElement.clientWidth;
        }
        else
        {
            var clientWidth = (document.documentElement.clientWidth>document.body.clientWidth)?document.body.clientWidth:document.documentElement.clientWidth;
        }
        return clientWidth;
    }
})()
