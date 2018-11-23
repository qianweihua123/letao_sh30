$(function(){

    var currentPage = 1;
    var pageSize = 5;
    var currentId;
    var isDelete;
    render()
    function render(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            dataType:'json',
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            success:function(info){
            //   console.log(info)
             var htmlStr = template( "tmp", info );
             $('tbody').html(htmlStr)
    
    
             $("#pagintor").bootstrapPaginator({
                bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                currentPage:info.page,//当前页
                totalPages:Math.ceil(info.total/info.size),//总页数
                size:"small",//设置控件的大小，mini, small, normal,large
                onPageClicked:function(a, b, c,page){
                  //为按钮绑定点击事件 page:当前点击的按钮值
                  currentPage =page
                  render()
    
                }
              });
            }
        })
    }


    //禁用启用功能需要注册事件委托
    $('tbody').on('click','.btn',function(){
        
      $('#userModel').modal("show")
     currentId= $(this).parent().data('id')
     isDelete = $(this).hasClass('btn-danger') ?0:1;

    })

    $('#submitBtn').on('click',function(){
        $('#userModel').modal("hide")
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
              id:currentId,
              isDelete:isDelete
            },
            dataType:'json',
            success:function(info){
           console.log(info)
           render()
            }
        })

    })

   
})