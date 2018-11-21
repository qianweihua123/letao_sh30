$(function(){
   



    $(document).ajaxStart(function(){
        NProgress.start()
    })

    $(document).ajaxStop(function(){
        NProgress.done()
    })


    $('#category').click(function(){
        
        $(this).next().slideToggle()
        console.log(1111)
    })


    $('.icon_left').click(function(){
        console.log(111)
     $('.lt_aside').toggleClass('hidemenu')
     $('.main').toggleClass('hidemenu')
     $('.top_bar').toggleClass('hidemenu')
    })


    $('.icon_right').click(function(){
        $('#loginout').modal('show')
    })


    $('#loginoutBtn').click(function(){
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            dataType:'json',
            success:function(info){
            //  console.log(info)
             if(info.success){
                //  console.log(111)
                 location.href = 'login.html'
             }
            }
        })
    })
})