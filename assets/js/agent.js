//根据标签名称进行事件代理
function agent1(parentId,eventType,label,fun){
    //父对象id 事件类型 标签名称 回调函数
    let oParent=document.getElementById(parentId);
    label=label.toUpperCase();
    oParent['on'+eventType]=function(star){
        let e=star||Event;
        e.stopPropagation();
        let child=e.target||e.srcElement;
        while(child.nodeName!==label && child.nodeName!==oParent.nodeName){
            //将字符串转换成大写 toUpperCase()
            child=child.parentNode;
        }
        if(child.nodeName==label){
            fun.call(child);
        }
    }
}
//根据class类名进行事件代理
//代理父标签不能与子标签同名
function agent2(parentId,eventType,clsName,fun){
    //父对象id 事件类型 传进来的类名 回调函数
    let oParent=document.getElementById(parentId);
    oParent['on'+eventType]=function(star){
        let e=star||Event;
        let child=e.target||e.srcElement;
        while(child.className!==clsName && child.nodeName!==oParent.nodeName){
            //将字符串转换成大写 toUpperCase()
            child=child.parentNode;
        }
        if(child.className==clsName){
            fun.call(child);
        }
    }
}
//根据classList进行事件代理 参数是Id
//代理父标签不能与子标签同名
function agent3(parentId,eventType,clsName,fun){
    //父对象id 事件类型 传进来的类名 回调函数
    let oParent=document.getElementById(parentId);
    oParent['on'+eventType]=function(star){
        let e=star||Event;
        let child=e.target||e.srcElement;
        while(!child.classList.contains(clsName) && child.nodeName!==oParent.nodeName){
            //将字符串转换成大写 toUpperCase()
            child=child.parentNode;
        }
        if(child.classList.contains(clsName)){
            fun.call(child);
        }
    }
}
//根据classList进行事件代理 参数是对象
function agent4(oParent,eventType,clsName,fun){
    //父对象id 事件类型 传进来的类名 回调函数
    oParent['on'+eventType]=function(star){
        let e=star||Event;
        let child=e.target||e.srcElement;
        while(!child.classList.contains(clsName) && child.nodeName!==oParent.nodeName){
            //将字符串转换成大写 toUpperCase()
            child=child.parentNode;
        }
        if(child.classList.contains(clsName)){
            fun.call(child);
        }
    }
}
//清除className
function clearName(parentId,label,className){
    let oParent=document.getElementById(parentId);
    let aLabel=oParent.querySelectorAll(label);
    for(let i=0;i<aLabel.length;i++){
        if(aLabel[i].className==className){
            aLabel[i].className='';
            break;
        }
    }
}
