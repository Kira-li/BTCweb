$(function () {
    if(GLOBAL.isLogin) {
        $('.res_bg').addClass('isdisplay');
        $('.login').on('click','.res_close',function(){
            $('.index_login').addClass('isdisplay');   
        })
        $('.res_close').on('click',function(){
            $('.res_bg').addClass('isdisplay')
        })
    } else {
        //未登录处理
        $('.index_regesiter').addClass('isdisplay');
        $('.index_login').removeClass('isdisplay');
        $('.index_mes').addClass('isdisplay');
        $('.index_fgt').addClass('isdisplay');
        
    }
    
    // 跳转注册页,短信验证登录，忘记密码
    $('.login_res').on('click',function(){
        $('.index_regesiter').removeClass('isdisplay');
        $('.index_login').addClass('isdisplay');
    })
    $('.login_mes').on('click',function(){
        $('.index_mes').removeClass('isdisplay');
        $('.index_login').addClass('isdisplay');
    })
    $('.login_fgt').on('click',function(){
        $('.index_fgt').removeClass('isdisplay');
        $('.index_login').addClass('isdisplay');
    })
    // 登录
    $('.login_btn').on('click',function(){
        var phone = $('.login_phone').val()
        var pwd = $('.login_pwd').val()
        $.ajax({
            type:'POST',
            url:GLOBAL.httpUrl+'home/getBaseRoom',
            dataType:'json',
            headers:{"Content-Type":"application/json"},
            // beforeSend: function(xhr) {
            //     xhr.setRequestHeader("Content-Type", "application/json");
            // },
            data:{phoneno:phone,password:pwd},
            success: function(data){
                // console.log(data);
                GLOBAL.isLogin = true
                $('.index_login').addClass('isdisplay');
            }
        })   
    })
    // 注册
    $('.regesiter_btn').on('click',function(){
        // alert(GLOBAL.isLogin)
        if(GLOBAL.regPhone.test($('.res_phone').val()) && GLOBAL.regPhone.test($('.res_pwd').val())){
            var data = {
                phoneno:$('.res_phone').val(),
                validcode:$('.res_code').val(),
                password:$('.res_pwd').val(),
                repassword:$('.res_repwd').val(),
                inviteid:$('.res_inv').val(),
            }
            $.ajax({
                type:'POST',
                url:GLOBAL.httpUrl+'auth/getValidCode',
                dataType:'json',
                headers:{"Content-Type":"application/json"},
                // beforeSend: function(xhr) {
                //     xhr.setRequestHeader("Content-Type", "application/json");
                // },
                data:data,
                success: function(data){
                    // console.log(data);
                    $('.index_regesiter').addClass('isdisplay');
                    $('.index_login').removeClass('isdisplay');
                }
            })
        } else {
            alert('手机号码或密码不合法')
        }
        
    })
    // 短信验证码登录
    $('.mes_btn').on('click',function(){
        
        if (GLOBAL.regPhone.test($('.mes_phone').val())){
            var data = {
                phoneno:$('.mes_phone').val(),
                validcode:$('.mes_code').val()
            }
            $.ajax({
                type:'POST',
                url:GLOBAL.httpUrl+'auth/loginByValidCode',
                dataType:'json',
                headers:{"Content-Type":"application/json"},
                // beforeSend: function(xhr) {
                //     xhr.setRequestHeader("Content-Type", "application/json");
                // },
                data:data,
                success: function(data){
                    console.log(data);
                    // $('.index_regesiter').addClass('isdisplay');
                    // $('.index_login').removeClass('isdisplay');
                }
            })
        } else {
            alert('手机号或验证码错误')
        }
    })
    // 修改密码
    $('.fgtpwd .mes_btn').on('click',function(){
        if (GLOBAL.regPhone.test($('.fgt_phone').val())){
            var data = {
                phoneno:$('.fgt_code').val(),
                validcode:$('.fgtpwd .mes_code').val()
            }
            $.ajax({
                type:'POST',
                url:GLOBAL.httpUrl+'auth/loginByValidCode',
                dataType:'json',
                headers:{"Content-Type":"application/json"},
                // beforeSend: function(xhr) {
                //     xhr.setRequestHeader("Content-Type", "application/json");
                // },
                data:data,
                success: function(data){
                    console.log(data);
                    // $('.index_regesiter').addClass('isdisplay');
                    // $('.index_login').removeClass('isdisplay');
                }
            })
        } else {
            alert('手机号或验证码错误')
        }
    })
    // 头部处理
    $('.header_login').on('click',function(){
        $('.index_login').removeClass('isdisplay');
    })
    $('.header_res').on('click',function(){
        $('.index_regesiter').removeClass('isdisplay');
    })
});
