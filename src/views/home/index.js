
$(function () {
    var bannerStr = ''
    $.ajax({
        type:'POST',
        url:GLOBAL.httpUrl+'home/getBanner',
        dataType:'json',
        headers:{"Content-Type":"application/json"},
        // beforeSend: function(xhr) {
        //     xhr.setRequestHeader("Content-Type", "application/json");
        // },
        success: function(data){
            // console.log(data)
            if(data.code == 200) {
                console.log(data.data.list)
                $.each(data.data.list,function(i,v){
                    bannerStr += '<li><a href=' + v.linkurl + '><img src=' + 'https://img.zcool.cn/community/01946559c5b66ba801218e187b33a3.jpg@1280w_1l_2' + '/></a></li>'
                })
                $(".banner .img").html(bannerStr)
                $(".banner .img img").css('width',GLOBAL.windowWidth+'px')
                // console.log(size)
                BannerMove(data.data.list.length)
            }
        }
    })
    // 轮播处理
    function BannerMove (length) {
        var i = 0;
        var clone=$(".banner .img li").first().clone();
        $(".banner .img").append(clone);
        var size = length+1;
        console.log(size)
        for(var j=0;j<size-1;j++){
            $(".banner .num").append("<li></li>");
        }
        $(".banner .num li").first().addClass('on');
        //鼠标划入圆点
        $(".banner .num li").hover(function(){
            var index=$(this).index();
            i=index;
            $(".banner .img").stop().animate({left:(-index*100)+'%'},1000);
            $(this).addClass('on').siblings().removeClass('on');
        })

        /*自动轮播*/
        var t=setInterval(function(){
            i++;
            move();
        },2000);

        //对banner定时器的操作
        $(".banner").hover(function(){
            clearInterval(t);
        },function(){
            t=setInterval(function(){
                i++;
                move();
            },2000);
        })

        /*向左按钮*/
        $(".banner .btn_l").click(function(){
            i++;
            move();
        })
        /*向右按钮*/
        $(".banner .btn_r").click(function(){
            i--;
            move();
        })

        function move(){
            if(i==size){
                $(".banner .img").css({left:0});
                i=1;
            }
            if(i==-1){
                $(".banner .img").css({left:-((size-1)*100)+'%'});
                i=size-2;
            }

            $(".banner .img").stop().animate({left:(-i*100)+'%'},1000);

            if(i==size-1){
                $(".banner .num li").eq(0).addClass('on').siblings().removeClass('on');
            }else{
                $(".banner .num li").eq(i).addClass('on').siblings().removeClass('on');
            }
        }
    }
    
    // 指数行情
    var zsData = ''
    $.ajax({
        type:'POST',
        url:GLOBAL.httpUrl+'home/getMarketIndex',
        dataType:'json',
        headers:{"Content-Type":"application/json"},
        // beforeSend: function(xhr) {
        //     xhr.setRequestHeader("Content-Type", "application/json");
        // },
        success: function(data){
            // console.log(data)
            var fontColor = ''
            if(data.code == 200) {
                if (data.data.list > 0) {
                    fontColor = 'red'
                } else if (data.data.list < 0)  {
                    fontColor = 'green'
                } else {
                    fontColor = 'red'
                }
                $.each(data.data.list,function(i,v){
                    zsData += '<li><p>' + v.indexname + '</p><p style = "font-size:18px;color:' + fontColor + ' ">' + v.price + '</p><p class="zs_profit" style="background-color:' + fontColor +'">' + v.profit +'</p></li>'
                })
            }
            $('.index_zs_list').html(zsData)
        }
    })
    // 合约交易
    var tradeData = ''
    $.ajax({
        type:'POST',
        url:GLOBAL.httpUrl+'home/getMarketIndex',
        dataType:'json',
        headers:{"Content-Type":"application/json"},
        // beforeSend: function(xhr) {
        //     xhr.setRequestHeader("Content-Type", "application/json");
        // },
        success: function(data){
            // console.log(data)
            var fontColor = ''
            if(data.code == 200) {
                if (data.data.list > 0) {
                    fontColor = 'red'
                } else if (data.data.list < 0)  {
                    fontColor = 'green'
                } else {
                    fontColor = 'red'
                }
                $.each(data.data.list,function(i,v){
                    tradeData += '<li class="clearfix"><p style="width:10%">' + v.indexname +'</p>'
                    tradeData += '<p style="width:18%">' + v.indexname +'</p>'
                    tradeData += '<p style="width:22%">' + v.indexname +'</p>'
                    tradeData += '<p style="width:18%">' + v.indexname +'</p>'
                    tradeData += '<p style="width:18%">' + v.indexname +'</p>'
                    tradeData += '<p style="width:14%"><input type="button" value="去交易"></p></li>'
                })
            }
            $('.index_trade_list').html(tradeData)
        }
    })
    $('.Pagebox').paging({
        initPageNo: 1, // 初始页码
        totalPages: 30, //总页数
        totalCount: '合计300条数据', // 条目总数
        slideSpeed: 600, // 缓动速度。单位毫秒 
        callback: function(page) { // 回调函数 
            console.log(page);
        }
    })
})