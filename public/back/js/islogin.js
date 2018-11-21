$(function(){
    $.ajax({
        type:'get',
        url:'/employee/checkRootLogin',
        dataType:'json',
        success:function(info){
            if(info.success){
                console.log('成功登陆过')
            }
            if(info.error === 400){
             location.href ="login.html"
            }
        }
    })

})