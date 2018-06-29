var GLOBAL = {};  
(function(){  
    GLOBAL.httpUrl = 'http://192.168.1.42/'
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
    GLOBAL.regPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
    GLOBAL.userInfo = {
        "userId":localStorage.getItem("user_userId"),
        "money":localStorage.getItem("user_money"),
        "phone":localStorage.getItem("user_phone")
    }
    // alert(GLOBAL.str);
})();  