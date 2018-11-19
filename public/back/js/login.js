$(function(){
    $('#form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
        fields:{
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                      },

                      stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度必须在2到6之间'
                      }, 
                      
                }

                
            },
            password:{
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                  },
                validators:{
                    notEmpty: {
                        message: '用户名不能为空'
                      },
                      stringLength: {
                        min: 6,
                        max: 12,
                        message: '用户名长度必须在6到12之间'
                      },  
                }
            }
        }
    })

    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$('#form').serialize(),
            dataType:'json',
            success:function(info){
                console.log(info)
                if(info.success){
                    location.href="index.html"
                }
                if(info.error ===1000){
                 alert('用户名错误')
                }
                if(info.error ===1001){
                    alert('密码错误')
                   }
            }
        })
    })

    $('[type="reset"]').click(function(){
        $("#form").data('bootstrapValidator').resetForm(true)
    })
})