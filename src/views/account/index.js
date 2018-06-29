$(function () {
var userPhone = GLOBAL.userInfo.phone.slice(0,3)+'*********' + GLOBAL.userInfo.phone.slice(7,11)
// 提现处理开始
    $.ajax({
        type:'POST',
        url:GLOBAL.httpUrl+'/pay/getPayType',
        dataType:'json',
        headers:{"Content-Type":"application/json", "token": GLOBAL.userInfo.userId},
        // data:data,
        success: function(data){
            if(data.code == 200) {
                // $('.account_buy_relase p span').html(data.data.randmoney)
                // payData.amount = $('.account_buy_relase p span').html()
                var payWay = ''
                var payType = ''
                for (var i=0 ;i<data.data.list.length;i++) {
                    if(data.data.list[i].paytype == 1) {
                        payType = '支付宝'
                    } else if(data.data.list[i].paytype == 2) {
                        payType = '微信'
                    } else {
                        payType = '银行卡' 
                    }
                    payWay += '<option value =' + data.data.list[i].paytype +' logid= '+ data.data.list[i].logid +'>'+ payType + '</option>'
                    // payWay +=>支付宝</option>'
                }
                $('.account_despoit_way select').html(payWay)
            }
        }
    })
    $.ajax({
        type:'POST',
        url:GLOBAL.httpUrl+'/cash/getCashMax',
        dataType:'json',
        headers:{"Content-Type":"application/json", "token": GLOBAL.userInfo.userId},
        // data:data,
        success: function(data){
            if(data.code == 200) {
                $('.account_despoit_all p span').html(data.data.cashMax)
                localStorage.setItem("user_money",data.data.cashMax)
            }
        }
    })
    $('.account_despoit_btn input').on('click',function(){
        var data = JSON.stringify({
            coinamount:$('.account_despoit_money input').val(),
            useraccount:$('.account_despoit_number input').val(),
            paytypeid:$('.account_despoit_way option:selected').attr('logid'),
            paytype:$('.account_despoit_way option:selected').val()
        })
        console.log(data)
        $.ajax({
            type:'POST',
            url:GLOBAL.httpUrl+'cash/createCashOrder',
            dataType:'json',
            headers:{"Content-Type":"application/json", "token": GLOBAL.userInfo.userId},
            data:data,
            success: function(data){
                console.log(data)
                if(data.code == 200) {
                    $('.index_pop').removeClass('isdisplay') 
                } else {
                    alert(data.msg)
                }
            }
        })
    })
    $('.account_despoit_all div').on('click',function(){
        $('.account_despoit_money input').val($('.account_despoit_all p span').html())
    })
// 提现处理结束
// 渲染充值列表开始
    $.ajax({
        type:'POST',
        url:GLOBAL.httpUrl+'pay/getPayMoneyConfig',
        dataType:'json',
        headers:{"Content-Type":"application/json", "token": GLOBAL.userInfo.userId},
        // beforeSend: function(xhr) {
        //     xhr.setRequestHeader("Content-Type", "application/json");
        // },
        // data:data,
        success: function(data){
            console.log(data)
            var payList = ''
            
            if(data.code == 200) {
                for (let index = 0; index < data.data.list.length; index++) {
                    // const element = array[index];
                    if(data.data.list[index].coinamount){
                        payList += '<input type="button" value="'+ data.data.list[index].coinamount +'乐币" paytypeid=0 productid='+  data.data.list[index].logid + '>'
                    }
                    
                }
                payList += '<input type="button" value="其它" paytypeid=1 productid='+ data.data.list[0].logid + '>'
                $('.account_buy .account_buy_list').html(payList)
                $('.account_buy_list input').eq(0).addClass('checked')
            }
        }
    })
// 渲染充值列表结束
// 轮播开始
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
//  轮播结束   
// hbs文件渲染
    var  a_tab = require('./tab.hbs');
    var  b_tab = require('./pay.hbs'); 
    $('.account_detail').html(a_tab)
    $('.account_trades').html(b_tab)
    $('.account_mes_name span').html(userPhone)
    $('.account_mes_id span').html(GLOBAL.userInfo.userId)
    $('.account_mes_change').on('click',function(){
        $('.index_fgt').removeClass('isdisplay')
    })
    $('.account_allmoney').html(GLOBAL.userInfo.money)
    // 分页
    $('.Pagebox').paging({
        initPageNo: 1, // 初始页码
        totalPages: 20, //总页数
        totalCount: '合计100条数据', // 条目总数
        slideSpeed: 600, // 缓动速度。单位毫秒 
        callback: function(page) { // 回调函数 
            console.log(page);
        }
    })
// tab列表切换开始
    $('.account_tab').on('click','li',function(){
        var index = $(this).index()
        for (var i = 0;i<3;i++) {
            $('.account_tab li').removeClass('color')
            $('.account_detail .account_tab_list').addClass('isdisplay')
        }
        $(this).addClass('color')
        $('.account_detail .account_tab_list').eq(index).removeClass('isdisplay')
        $('.account_trades').addClass('isdisplay')
        $('.account_despoit').addClass('isdisplay')
        $('.account_detail').removeClass('isdisplay')
    })
// tab列表切换结束

// 充值处理开始
    $('.account_pay_buy').on('click',function(){
        $('.account_detail').addClass('isdisplay')
        $('.account_despoit').addClass('isdisplay')
        $('.account_trades').removeClass('isdisplay')
    })
    $('.account_pay_despoit').on('click',function(){
        $('.account_detail').addClass('isdisplay')
        $('.account_trades').addClass('isdisplay')
        $('.account_despoit').removeClass('isdisplay')
    })
    var payData = {
        paytype:3,
        paytypeid:'',
        productid:'',
        amount:100.11,
        coinamount:100,
    }
    $('.account_buy_way li').on('click','input[type="radio"]',function(){
        // var index = $(this).parent('li').index()
        for (var i = 0;i<3;i++) {
            $('.account_buy_way li input[type="radio"]').attr('checked',false);
        }
        $(this).attr('checked',true)
        payData.paytype = $(this).attr('value')
    })
    $('.account_buy_list').on('click','input',function(){
        var index = $(this).index()
        for (var i = 0;i<$('.account_buy_list input').length;i++) {
            $('.account_buy_list input').removeClass('checked')
        }
        $(this).addClass('checked');
        
        
        if ($(this).val()==='其它') {
            $('.account_buy_other input').focus()
            $('.account_buy_other').removeClass('isdisplay')
            $('.account_buy_other input').on('input',function(e){
                // console.log(e.delegateTarget.value);
                payData.coinamount = parseInt(e.delegateTarget.value)
                // console.log(money)
                getPayRand(payData.coinamount)
            })
        } else {
            $('.account_buy_other input').blur()
            $('.account_buy_other').addClass('isdisplay')
            payData.coinamount = parseInt($(this).val())
            getPayRand(payData.coinamount)
        } 
        payData.paytypeid = $(this).attr('paytypeid')
        payData.productid = $(this).attr('productid')
        
    })
    function getPayRand(money) {
        var data = JSON.stringify({money:money})
        $.ajax({
            type:'POST',
            url:GLOBAL.httpUrl+'pay/getPayRand',
            dataType:'json',
            headers:{"Content-Type":"application/json", "token": GLOBAL.userInfo.userId},
            data:data,
            success: function(data){
                if(data.code == 200) {
                    $('.account_buy_relase p span').html(data.data.randmoney)
                    payData.amount = $('.account_buy_relase p span').html()
                }
            }
        })   
    }
    $('.account_buy_relase input').on('click',function(){
        var data = JSON.stringify(payData)
        console.log(data)
        $.ajax({
            type:'POST',
            url:GLOBAL.httpUrl+'pay/createPayOrder',
            dataType:'json',
            headers:{"Content-Type":"application/json", "token": GLOBAL.userInfo.userId},
            data:data,
            success: function(data){
                console.log(data)
                if(data.code == 200) {
                    if(payData.paytype == 3) {
                        $('.account_buy').addClass('isdisplay')
                        $('.account_wx').addClass('isdisplay')
                        $('.account_bank').removeClass('isdisplay')
                    } else {
                        $('.account_buy').addClass('isdisplay')
                        $('.account_bank').addClass('isdisplay')
                        $('.account_wx').removeClass('isdisplay')
                    }
                }
            }
        }) 
    })
    // 银行卡支付处理
    $('.account_bank_enter input').on('click',function(){
        $('.index_pop').removeClass('isdisplay')
    })
    $('.index_pop input').on('click',function(){
        $('.index_pop').addClass('isdisplay')
        $('.account_detail').removeClass('isdisplay')
        $('.account_trades').addClass('isdisplay')
        $('.account_despoit').addClass('isdisplay')
    })
   
// 充值处理结束
})