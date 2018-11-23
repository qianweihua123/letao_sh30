$(function(){
    var currentPage = 1;
    var pageSize = 5;
    render()
    function render(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            dataType:'json',
            success:function(info){
            console.log(info)
    
            var htmlStr = template('usetemplate',info)
            $('tbody').html(htmlStr)
    
            $("#pagintor").bootstrapPaginator({
                bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                currentPage:info.page,//当前页
                totalPages:Math.ceil(info.total/info.size),//总页数
                size:"small",//设置控件的大小，mini, small, normal,large
                onPageClicked:function(event, originalEvent, type,page){
                  //为按钮绑定点击事件 page:当前点击的按钮值
                  currentPage = page;
                  render()
                }
              });
            }
    
        })
    }


    $('.btnAdd').on('click',function(){
        $('#addModel').modal("show")
    })
      
    $('#form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
          fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '输入不能为空'
                      },
                }
            }
          }


    })
    $('#form').on("success.form.bv", function( e ) {

        // 阻止默认的提交
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            dataType:'json',
            data:$('#form').serialize(),
            success:function(info){
            console.log(info)
            currentPage = 1;
            $('#addModel').modal("hide")
            render()
            $('#form').data("bootstrapValidator").resetForm( true );
            }

        })
      })


    })
    



        