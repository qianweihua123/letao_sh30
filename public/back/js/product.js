$(function(){
    var currentPage = 1
    var pageSize = 3
    var picArr = []
    render()
    function render(){
        $.ajax({
            type:"get",
            url:"/product/queryProductDetailList",
            dataType:"json",
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            success:function(info){
             console.log(info)
             var htmlStr = template('product_temp',info)
             $('tbody').html(htmlStr)
            //  分页插件
             $("#pagintor").bootstrapPaginator({
                bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                currentPage:info.page,//当前页
                totalPages:info.total/info.size,//总页数
                size:"small",//设置控件的大小，mini, small, normal,large
                onPageClicked:function(event, originalEvent, type,page){
                  //为按钮绑定点击事件 page:当前点击的按钮值
                   currentPage = page
                   render()
                }
              });
            }
            

        })
    }

//给添加商品注册点击事件
  $('.btn_add').on('click',function(){
      $("#addModel").modal('show')
    //   同时让他发送请求渲染一级分类内容
    $.ajax({
        type:"get",
        url:"/category/querySecondCategoryPaging",
        dataType:"json",
        data:{
            page:1,
            pageSize:100,
        },
        success:function(info){
            console.log(info)
            var htmlStr = template('updown_temp',info)
            $('.dropdown-menu').html(htmlStr)
        }
    })
  })

  //点击二级分类下面的下拉选项把内容给到大框
  $('.dropdown-menu').on('click','a',function(){
      $("#dropdownText").text($(this).text())
      var id = $(this).data('id')
      $('[name="brandId"]').val(id)
      $("#form").data('bootstrapValidator').updateStatus("brandId","VALID" )
  })

  //配置上传图片
  $("#updownimg").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data);
      console.log(333)
      var picObj = data.result
      var picAddr = data.result.picAddr
      picArr.unshift(picObj)
      $('#imgbox').prepend('<img src="'+picAddr+ '" style="width:100px">')
      if(picArr.length > 3){
          picArr.pop()
          $('#imgbox img:last-of-type').remove()
      }

      if(picArr.length ===3){
        $("#form").data('bootstrapValidator').updateStatus("picStatus","VALID" )
      }
    }
});

//配置表单验证
$('#form').bootstrapValidator({
    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
        brandId: {
            validators: {
                notEmpty: {
                  message: "请选择二级分类"
                }
        }
    },
    proName: {
        validators: {
            notEmpty: {
              message: "请输入商品名称"
            }
    }
},
proDesc: {
    validators: {
        notEmpty: {
          message: "请输入商品描述"
        }
}
},
num: {
    validators: {
      notEmpty: {
        message: "请输入商品库存"
      },
      //正则校验
      regexp: {
        regexp: /^[1-9]\d*$/,
        message: '商品库存格式, 必须是非零开头的数字'
      }
    }
  },
  // 尺码校验, 规则必须是 32-40, 两个数字-两个数字
  size: {
    validators: {
      notEmpty: {
        message: "请输入商品尺码"
      },
      //正则校验
      regexp: {
        regexp: /^\d{2}-\d{2}$/,
        message: '尺码格式, 必须是 32-40'
      }
    }
  },
  // 商品价格
  price: {
    validators: {
      notEmpty: {
        message: "请输入商品价格"
      }
    }
  },
  // 商品原价
  oldPrice: {
    validators: {
      notEmpty: {
        message: "请输入商品原价"
      }
    }
  },
  picStatus: {
    validators: {
      notEmpty: {
        message: "请上传3张图片"
      }
    }
  }
    
}

})

$("#form").on("success.form.bv", function( e ) {
    // 阻止默认的提交
    e.preventDefault();
    var params = $('#form').serialize()
    // console.log(params)
    params += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    params += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    params += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;
    console.log(params)
    $.ajax({
        type:"post",
        url:"/product/addProduct",
        dataType:"json",
        data:params,
        success:function(info){
            if (info.success) {
                // 关闭模态框
                $('#addModal').modal("hide");
                // 重置校验状态和文本内容
                $('#form').data("bootstrapValidator").resetForm(true);
                // 重新渲染第一页
                currentPage = 1;
                render();
      
                // 手动重置, 下拉菜单
                $('#dropdownText').text("请选择二级分类")
      
                // 删除结构中的所有图片
                $('#imgBox img').remove();
                // 重置数组 picArr
                picArr = [];
      
              }
        }
    })

})
  
})