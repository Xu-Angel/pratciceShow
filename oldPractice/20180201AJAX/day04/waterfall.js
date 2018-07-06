(function ($) {
  $.fn.Waterfall = function(column){
    //这是瀑布流的容器
  var parent = $(this);
  var parentWidth =parent.width();
  //瀑布流当中的item
  var items = parent.children();
  var childWidth = items.width();
  //多少列
  var columnConut = column;
  //x间距，y间距
  var xspace = (parentWidth-childWidth*columnConut)/(columnConut-1);
  var yspace = 10;
  //需要有一个数组，记录每一列的高度变化
  var columnArray = [];
  //遍历items盒子
  items.each(function(index,obj){
    console.log(index,obj)
    //当前遍历到的对象是DOM元素
    var $obj= $(obj);
    var height = $obj.height();
    
    //第一行比较特殊，所有的top都为0，当前还是没有高度columnArray
    if(index<columnConut){
      columnArray[index] = height;
      $obj.css({top:0,left:index*(childWidth+xspace)});			
    }
    //正常情况下
    else{
      /*
       每一次都需要追加到最矮的那一列
       怎么找到最矮的那一列？？？？
       假设 我们的第一个数据就是最矮的
       * */
      var minIndex = 0;
      var minHeight = columnArray[minIndex];
      for(var i=0;i<columnArray.length;i++){
        if(minHeight>columnArray[i]){
          minHeight = columnArray[i];
          minIndex = i;
        }
      };
      //当我们加一个盒子之后，我们要更新当前列的高度
      $obj.css({top:minHeight+yspace,left:minIndex*(childWidth+xspace)});
      columnArray[minIndex]= minHeight+yspace+$obj.height();
      //最后我们来设置瀑布流容器的高度
      //获取最高的那一列的高度
      var max = Math.max.apply(null,columnArray);
      parent.height(max);
    }
    //$('div').css('margin','0 auto')
    //$('input').css('top','20px')
    //$('sapn').css('position','absolute')
  })
}
})(jQuery)