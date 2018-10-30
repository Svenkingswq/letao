$(function() {
    // 1.进行表单校验设置
    $("#form").bootstrapValidator({
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', // 校验成功
            invalid: 'glyphicon glyphicon-remove', // 校验失败
            validating: 'glyphicon glyphicon-refresh' // 校验中
        },
        //   配置校验字段
        fields: {
            // 配置用户名校验
            username: {
                // 配置校验规则
                validators: {
                    // 非空校验
                    notEmpty: {
                        message: "用户名不能为空",
                    },
                    // 用户名长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名长度必须是2-6位"
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }

            },
            // 配置密码校验
            password: {
                // 校验规则
                validators: {
                    // 非空校验
                    notEmpty: {
                        message: "密码不能为空",
                    },
                    // 密码长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度必须是6-12位"

                    },
                    callback: {
                        message: "密码不正确"
                    }
                }
            }
        }
    })
});
// 2.登录功能：在表单验证成功时，阻止默认跳转，通过ajax提交
$("#form").on("success.form.bv", function(e) {

    e.preventDefault(); //阻止默认跳转

    $.ajax({
        type: "post",
        url: "/employee/employeeLogin",
        data: $("#form").serialize(), //表单序列化
        dataType: "json",
        success: function(info) {
            if (info.success) {
                location.herf = "index.html";
            }
            if (info.error === 1000) {
                $("#form").data('bootstrapValidator').updateStatus("username", "INVALID", "callback");
                // $("#form").bootstrapValidator('updateStatus', "username", 'INVALID', "callback")
            }
            if (info.error === 1001) {
                $("#form").data('bootstrapValidator').updateStatus("password", "INVALID", "callback")
            }
        }

    })
});
// 重置功能
$("[type='reset']").click(function() {
    // 调用了实例的方法，传参内容状态都重置，不传只重置内容
    $("#form").data("bootstrapValidator").resetForm(true);
})