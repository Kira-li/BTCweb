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
        var data = JSON.stringify({phoneno:phone,password:pwd})
        var userId = GLOBAL.userInfo.userId;
        $.ajax({
            type:'POST',
            url:GLOBAL.httpUrl+'auth/login',
            dataType:'json',
            headers:{"Content-Type":"application/json", "token": userId},
            // beforeSend: function(xhr) {
            //     xhr.setRequestHeader("Content-Type", "application/json");
            // },
            data:data,
            success: function(data){
                // console.log(data);
                console.log(data)
                // console.log()
                if(data.code == 200) {
                    console.log(data.data.userId)
                    GLOBAL.isLogin = true
                    localStorage.setItem("user_phone",$('.login_phone').val())
                    localStorage.setItem("user_userId",data.data.userId)
                    $('.index_login').addClass('isdisplay'); 
                }
            }
        })   
    })
    // 注册
    $('.regesiter_btn').on('click',function(){
        // alert(GLOBAL.isLogin)
        if(GLOBAL.regPhone.test($('.res_phone').val()) && GLOBAL.regPwd.test($('.res_pwd').val())){
            var data = JSON.stringify({
                phoneno:$('.res_phone').val(),
                validcode:$('.res_code').val(),
                password:$('.res_pwd').val(),
                repassword:$('.res_repwd').val(),
                inviteid:$('.res_inv').val(),
            })
            $.ajax({
                type:'POST',
                url:GLOBAL.httpUrl+'auth/register',
                dataType:'json',
                headers:{"Content-Type":"application/json"},
                // beforeSend: function(xhr) {
                //     xhr.setRequestHeader("Content-Type", "application/json");
                // },
                data:data,
                success: function(data){
                    // console.log(data);
                    if(data.code == 200) {
                        $('.index_regesiter').addClass('isdisplay');
                        $('.index_login').removeClass('isdisplay');
                    }

                }
            })
        } else {
            alert('手机号码或密码不合法')
        }
        
    })
    $('.regesiter_login p').on('click',function(){
        $('.index_login').removeClass('isdisplay')
        $('.index_regesiter').addClass('isdisplay')
    })
    // 发送验证码
    function getValidCode(data){
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
                console.log(data)
            }
        })
    }
    $('.fgtpwd .mes_code_btn').click(function(){
        var data = JSON.stringify({phoneno:$('.fgtpwd .fgt_phone').val()})
        console.log(data)
        getValidCode(data)
    })
    $('.meslogin .mes_code_btn').click(function(){
        var data = JSON.stringify({phoneno:$('.meslogin .mes_phone').val()})
        console.log(data)
        getValidCode(data)
    })
    $('.regesiter .res_code_btn').click(function(){
        var data = JSON.stringify({phoneno:$('.regesiter .res_phone').val()})
        console.log(data)
        getValidCode(data)
    })
    // 短信验证码登录
    $('.mes_btn').on('click',function(){
        
        if (GLOBAL.regPhone.test($('.mes_phone').val())){
            var data = JSON.stringify({
                phoneno:$('.mes_phone').val(),
                validcode:$('.mes_code').val()
            })
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
                    $('.index_mes').addClass('isdisplay');
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
            var data = JSON.stringify({
                phoneno:$('.fgt_code').val(),
                validcode:$('.fgtpwd .mes_code').val()
            })
            $.ajax({
                type:'POST',
                url:GLOBAL.httpUrl+'user/resetPassword',
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
