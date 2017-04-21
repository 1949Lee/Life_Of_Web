/**
 * Created by Lee on 2016/10/18.
 */
window.onload = function(){
    //�����ٲ���������
    PBL('wrap','box');
    //ģ������
    var data = [
        {'src':'images/1.jpg'},
        {'src':'images/2.jpg'},
        {'src':'images/3.jpg'},
        {'src':'images/4.jpg'},
        {'src':'images/5.jpg'},
        {'src':'images/6.jpg'},
        {'src':'images/7.jpg'},
        {'src':'images/8.jpg'},
        {'src':'images/9.jpg'},
        {'src':'images/10.jpg'}
    ];

    var nowp = 1;
    //���ù�������
    window.onscroll = function(){
//		alert();
        //У����������
        if(getCheck()){
            var wrap = document.getElementById('wrap');
//			for(i in data){
            $.post("http://192.168.1.33/lee/PHP/0922/loadingImagesLikeWaterFall/api/getmenu.php",{nowpage:nowp},function (data) {
//			$.post("http://169.254.69.213/PHP/0922/loadingImagesLikeWaterFall/api/getmenu.php",{nowpage:nowp},function (data) {
                for(var i = 0 ;i < data.length;i++){
                    //����box
                    var box = document.createElement('div');
                    box.className = 'box';
                    wrap.appendChild(box);
                    //����info
                    var info = document.createElement('div');
                    info.className = 'info';
                    box.appendChild(info);
                    //����pic
                    var pic = document.createElement('div');
                    pic.className = 'pic';
                    info.appendChild(pic);
                    //����img
                    var img = document.createElement('img');
//					img.src = data[i].src;
                    img.src = 'images/'+data[i].ID+".jpg";
                    img.style.height = 'auto';
                    pic.appendChild(img);
                    console.log(i);
                }
                PBL('wrap','box');

            },"json");

//			}

        }
    }
}

function PBL(wrap,box){
//	alert();
    //	1.�������Լ�ÿһ��box
    var wrap = document.getElementById(wrap);
    var boxs  = getClass(wrap,box);
    //	2.�����Ļ����ʾ������
    var boxW = boxs[0].offsetWidth;
    var colsNum = Math.floor(document.documentElement.clientWidth/boxW);
    wrap.style.width = boxW*colsNum+'px';//Ϊ��㸳ֵ���
    //	3.ѭ�������е�box�������ٲ�������
    var everyH = [];//����һ������洢ÿһ�еĸ߶�
    for (var i = 0; i < boxs.length; i++) {
        if(i<colsNum){
            everyH[i] = boxs[i].offsetHeight;
        }else{
            var minH = Math.min.apply(null,everyH);//�����С���еĸ߶�
            var minIndex = getIndex(minH,everyH); //�����С�е�����
            getStyle(boxs[i],minH,boxs[minIndex].offsetLeft,i);
            everyH[minIndex] += boxs[i].offsetHeight;//������С�еĸ߶�
        }
    }
}

function getClass(wrap,className){
    var obj = wrap.getElementsByTagName('*');
    var arr = [];
    for(var i=0;i<obj.length;i++){
        if(obj[i].className == className){
            arr.push(obj[i]);
        }
    }
    return arr;
}

function getIndex(minH,everyH){
    for(index in everyH){
        if (everyH[index] == minH ) return index;
    }
}

function getCheck(){
    var documentH = document.documentElement.clientHeight;
    var scrollH = document.documentElement.scrollTop || document.body.scrollTop;
    return documentH+scrollH>=getLastH() ?true:false;
}

function getLastH(){
    var wrap = document.getElementById('wrap');
    var boxs = getClass(wrap,'box');
    return boxs[boxs.length-1].offsetTop+boxs[boxs.length-1].offsetHeight;
}

var getStartNum = 0;
function getStyle(box,top,left,index){
    if (getStartNum>=index) return;
    $(box).css({
        'position':'absolute',
        'top':top,
        "left":left,
        "opacity":"0"
    });
    $(box).stop().animate({
        "opacity":"1"
    },999);
    getStartNum = index;//�����������ݵ�����λ��
}