//去除 data 里带null 的键值   
//用法   this.$ajaxNull.get(data)
//用法   this.$ajaxNull.post(data)
const ajax_null = {};
// get写在链接

ajax_null.get = (opt) => {
    let str = "";
    for(let key in opt){
        if(!opt[key] && opt[key] != 0 || opt[key]=='N/A'){
            // delete opt[key]
        }else{
            str += "&"+key+"="+opt[key];
        }
        
    }
    
    str = str.substr(1);
    str = '?'+ str;
    return str;
};
// post 写在data
ajax_null.post = (opt) => {
    for(let key in opt){
        if(!opt[key] && opt[key] != 0 || opt[key] == 'N/A'){
            delete opt[key]
        }
    }
    return opt;
};
export default ajax_null;