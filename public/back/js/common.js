//ajax全局事件，当第一个ajax发送时，调用进度条开始
$(document).ajaxStart(function() {
    NProgress.start();
});
// ajax全局事件，当所有的ajax请求完成时，调用进度条结束
$(document).ajaxStop(function() {
    // 定时器，模拟网络延迟
    setTimeout(function() {
        NProgress.done();

    }, 500);
});