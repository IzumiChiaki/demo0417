//地点区域联动————区域信息
function setSelectCollege() {
    var content1 = document.getElementById("select");
    var content2 = document.getElementById("input1");
    content2.value = content1.value;
    var header = $("meta[name='_csrf_header']").attr("content");
    var token = $("meta[name='_csrf']").attr("content");
    var index=$('#select option:selected').val();
    var optionJson=[];
    $.ajax({
        url: "/AreaInfo_visitor_ajax",
        type: "post",
        data: {"location_name":index},
        dataType: "json",
        beforeSend:function(xhr){
          xhr.setRequestHeader(header,token);
        },
        success:function(data){
            //alert(data.length);
            optionJson = data;
            var selectObj=document.getElementById("area");
            selectObj.options.length=0;
            selectObj.options.add(new Option("--区域--",0));
            for(var i=0;i<data.length;i++){
                selectObj.add(new Option(optionJson[i].areaName,optionJson[i].areaName));
            }
        },
        error:function (xhr,ajaxOptions,throwError) {
        }
    })
}

//区域设备联动————设备信息
function setSelectDevice() {
    var content1 = document.getElementById("area");
    var content2 = document.getElementById("input");
    content2.value = content1.value;
    var header = $("meta[name='_csrf_header']").attr("content");
    var token = $("meta[name='_csrf']").attr("content");
    var index=$('#area option:selected').val();
    var optionJson=[];
    $.ajax({
        url: "/ProbeInfo_visitor_ajax",
        type: "post",
        data: {"areaname":index},
        dataType: "json",
        beforeSend:function(xhr){
            xhr.setRequestHeader(header,token);
        },
        success:function(data){
            optionJson = data;
            var selectObj=document.getElementById("device");
            selectObj.options.length=0;
            selectObj.options.add(new Option("--设备--",0));
            for(var i=0;i<data.length;i++){
                selectObj.add(new Option(optionJson[i].deviceId,optionJson[i].deviceId));
            }
        },
        error:function (xhr,ajaxOptions,throwError) {
        }
    })
}

//设备探针联动————探针信息
function setSelectProbe() {
    var content1 = document.getElementById("device");
    var content2 = document.getElementById("input2");
    content2.value = content1.value;
    var header = $("meta[name='_csrf_header']").attr("content");
    var token = $("meta[name='_csrf']").attr("content");
    var index1=$('#select option:selected').val();
    var index2=$('#area option:selected').val();
    var index3=$('#device option:selected').val();
    var optionJson=[];
    $.ajax({
        url: "/CorrosionInfo_visitor_ajax",
        type: "post",
        data: {"location_name":index1,"areaname":index2,"deviceid":index3},
        dataType: "json",
        beforeSend:function(xhr){
            xhr.setRequestHeader(header,token);
        },
        success:function(data){
            optionJson = data;
            var selectObj=document.getElementById("probe");
            selectObj.options.length=0;
            selectObj.options.add(new Option("--探针--",0));
            for(var i=0;i<data.length;i++){
                selectObj.add(new Option(optionJson[i].probeId,optionJson[i].probeId));
            }
        },
        error:function (xhr,ajaxOptions,throwError) {
        }
    })
}