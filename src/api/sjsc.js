import Vue from 'vue';
const getName=()=>{          //姓名
    let familyNames = new Array(
        "赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", 
        "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
        "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏", 
        "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章",
        "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦", 
        "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳",
        "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺", 
        "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
        "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余", 
        "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹"
    );
    let givenNames = new Array(
        "子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛", 
        "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊", 
        "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政", 
        "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建", 
        "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋", 
        "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅", 
        "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡", 
        "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕", 
        "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵", 
        "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"
    );
    let num_i = familyNames.length -1;
    let num_j = givenNames.length - 1;
    let i = parseInt( Math.random()*num_i);
    let familyName = familyNames[i];
    let j = parseInt( Math.random()*num_j);
    let givenName = givenNames[j];
    let name = familyName + givenName;

    return name;
}
const getId = () => {                 //id
    return Math.floor(Math.random()*999999)   
}
const getUserGroup = () => {           //设计师or普通or商户
    let group = Math.floor(Math.random()*10);
    return group == 1? '设计师':(group == 2?'商户':'普通');   
}
const getSex = () => {                 //性别
    return Math.floor(Math.random()*100)%2 == 0? '男':'女';   
}
const getPhone = () => {               //电话号码
    var prefixArray = new Array("130", "131", "132", "133", "135", "137", "138", "170", "187", "189");
    var i = parseInt(10 * Math.random());

    var prefix = prefixArray[i];

    for (var j = 0; j < 8; j++) {

        prefix = prefix + Math.floor(Math.random() * 10);

    }

    return prefix;
}
const getNum = () => {              //数量
    return Math.floor(Math.random()*1000) 
}
const getNum3 = () => {              //[0,1,2,3]  登录方式,手机0,微信1,QQ2,微博3
    let numF = Math.floor(Math.random()*100);
    let num = 0;
    if(numF < 25){
        num = 0
    }else if(numF>=25&&numF<50){
        num = 1
    }else if(numF>=50&&numF<75){
        num = 2
    }
    return  num;
}
const getTime = () => {              //时间
    let start_time = Date.parse(new Date('2019','01','01'));
    let end_time = Date.parse(new Date());
    let time = Math.floor(Math.random()*(end_time - start_time)+start_time);
    time = new Date(time);
    let YY = time.getFullYear();
    YY<10&&(YY='0'+YY);
    let MM = parseInt(time.getMonth()+1);
    MM<10&&(MM='0'+MM);
    let DD = time.getDate();
    DD<10&&(DD='0'+DD);
    let hh = time.getHours();
    hh<10&&(hh='0'+hh);
    let mm = time.getMinutes();
    mm<10&&(mm='0'+mm);
    let ss = time.getSeconds();
    ss<10&&(ss='0'+ss);
    return `${YY}-${MM}-${DD}  ${hh}:${mm}:${ss}`
}
const getBool = () => {              //switch 滑块
    return Math.floor(Math.random()*10)%3 == 0?'0':'1';
}

export  {getName,getId,getUserGroup,getSex,getPhone,getNum,getNum3,getTime,getBool}


Vue.prototype.$getName = getName;
Vue.prototype.$getId = getId;
Vue.prototype.$getUserGroup = getUserGroup;
Vue.prototype.$getSex = getSex;
Vue.prototype.$getPhone = getPhone;
Vue.prototype.$getNum = getNum;
Vue.prototype.$getNum3 = getNum3;
Vue.prototype.$getTime = getTime;
Vue.prototype.$getBool = getBool;

 