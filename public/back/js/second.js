$(function(){
    var currentPage=1;
    var pageSize = 5;
   render()
    function render(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging' ,
            datatype:'json',
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            success:function(info){
                console.log(333)
              console.log(info)
             var htmlStr = template('sectemplate',info);
             $('tbody').html(htmlStr)
             $("#pagintor").bootstrapPaginator({
                 bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                 currentPage:info.page,//当前页
                 totalPages:Math.ceil(info.total/info.size),//总页数
                 size:"small",//设置控件的大小，mini, small, normal,large
                 onPageClicked:function(event, originalEvent, type,page){
                   //为按钮绑定点击事件 page:当前点击的按钮值
                   currentPage=page
                   render()
                 }
               });
     
            }
         })
    }
   

    $('.btn_add').on('click',function(){
        $('#addModel').modal('show')

        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            dataType:'json',
            data:{
                page:1,
                pageSize:100,
            },
            success:function(info){
                
             var htmlStr = template('addDown',info);
             $('.dropdown-menu').html(htmlStr)
            }
        })
    })

    $('.dropdown-menu').on('click','a',function(){
      var text = $(this).text()
      $('#dropdownText').text(text)
      var id = $(this).data('id')
      $('[name="categoryId"]').val(id)
      console.log(33444)
      $("#form").data('bootstrapValidator').updateStatus('categoryId','VALID')
    })


    $("#updownimg").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
          console.log(data);
         var src = data.result.picAddr
         $('#imgbox img').attr('src',src),
         $('[name="brandLogo"]').val(src)

         $("#form").data('bootstrapValidator').updateStatus('brandLogo','VALID')
        },
        
        
  });

  $("#form").bootstrapValidator({
      excluded:[],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{
        categoryId: {
            validators: {
                notEmpty: {
                    // 提示信息
                    message: "请输入一级分类名称"
                  }
            }
        },
        brandName: {
            validators: {
                notEmpty: {
                    // 提示信息
                    message: "请输入二级分类名称"
                  }
            }
        },
        brandLogo: {
            validators: {
                notEmpty: {
                    // 提示信息
                    message: "请上传图片"
                  }
            }
        }
    }
})
})