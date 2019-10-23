// ==UserScript==
// @name         自用论坛辅助签到
// @namespace    bbshelper
// @version      1.0.9
// @description  常用论坛辅助签到工具，包括天使动漫论坛、52破解、TTG、卡饭
// @author       Eva
// @include      http*://u2.dmhy.org/*
// @include      http*://www.tsdm.*/*
// @include      http*://totheglory.im/*
// @include      http*://www.52pojie.cn/*
// @include      http*://bbs.kafan.cn/*
// @include      http*://www.cordcloud.*/*
// @include      http*://www.zodgame.us/*
// @grant        unsafeWindow
// @require      https://code.jquery.com/jquery-latest.min.js
// @run-at 		 document-end
// ==/UserScript==

(function() {
    //U2
    if(matchURL("u2.dmhy.org")){
        if(matchURL("showup.php")){
            var message = $("textarea[name='message']");
            if(message) message.text("注意：回答按钮点击时即提交，手滑损失自负~");
        }else if(window.find("立即签到")){
            window.location.href = "showup.php";
        }
    }

    //TTG
    if(matchURL("totheglory.im")){
        if($("#signed")) $("#signed")[0].click();
    }

    //天使动漫
    if (matchURL("tsdm")) {
        qd('签到领奖!','wl_s');
    }

    //52破解
    if(matchURL("52pojie.cn")){
        var qdimg = $("img[src$='qds.png']");
        if(qdimg) {
            $.ajax({
                url:'home.php?mod=task&do=apply&id=2',
                dataType:'html',
                success:function(result){
                    if(result.indexOf('任务已完成') != -1){
                        console.log("签到成功!");
                        qdimg.attr('src','https://www.52pojie.cn/static/image/common/wbs.png');
                    }
                }
            })
        }
    }

    //卡饭
    if(matchURL("kafan.cn")){
        var dklink = $("img[src$='dk.png']").closest("a");
        if($("img[src$='wb.png']").closest("a").css('display') === 'none') {
            dklink[0].click();
        }
    }

    //CordCloud
    if(matchURL("cordcloud")){
        var qdBtn = $("#checkin");
        if(qdBtn.length > 0) {
            $.ajax({
                type: "POST",
                url: "/user/checkin",
                dataType: "json",
                success: function (data) {
                    $("#checkin-msg").html(data.msg);
                    $("#checkin-btn").hide();
                    $("#msg").html(data.msg);
                }
            })
        }
    }

    //ZodGame
    if (matchURL("zodgame.xyz")) {
        qd('','fd_s');
    }

    function qd(checkElement,emoji){
        if(matchURL('dsu_paulsign:sign')){
            if (window.find("今天签到了吗") && window.find("写下今天最想说的话")) {
                $("#"+emoji).attr('checked',true);
                $("#todaysay").val("每天签到水一发。。。");
                $("#qiandao").submit();
            }
        }else if(window.find(checkElement)){
            window.location.href = "plugin.php?id=dsu_paulsign:sign";
        }
    }

    function matchURL(x){
        return window.location.href.indexOf(x) != -1;
    }
})();
