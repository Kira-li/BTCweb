var GLOBAL = {};  
(function(){  
    GLOBAL.httpUrl = 'http://192.168.1.41/'
    GLOBAL.isLogin = true;
    GLOBAL.countdown = 120;
    GLOBAL.windowWidth = document.body.clientWidth
    GLOBAL.setTime =function(val){
        if (GLOBAL.countdown == 0) { 
            val.removeAttribute("disabled"); 
            val.value="发送验证码"; 
            GLOBAL.countdown = 120; 
        } else { 
            val.setAttribute("disabled", true); 
            val.value=GLOBAL.countdown +"s重新发送"; 
            GLOBAL.countdown--; 
            setTimeout(function() { 
                GLOBAL.setTime(val) 
            },1000) 
        } 
        
    }
    GLOBAL.regPhone = /^1[345789]\d{9}$/
    GLOBAL.regPwd = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,16}$/
    GLOBAL.userInfo = {
        "userId":'',
        "token":'',
        "phone":''
    }
    // alert(GLOBAL.str);
})();  