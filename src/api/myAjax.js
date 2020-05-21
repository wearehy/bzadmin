// 向admin/service/admin/power/check 传入route，确定按钮是否能使用
// that.$myAjax.get( url).then( function(res_c){
//     console.log(res_c)
// })
import {Message} from 'element-ui';
import axios from 'axios' 
import store from '../store/index.js' ;//引入状态管理 store

const myAjax = {}
const fun = (url,data,bool,method) => {      //ul 地址,data data内容,bool 是否弹出后台反馈,
  return new Promise((resolve, reject) => {
  
    //这里可以在调用的时候看到你的method、url、data、headers等参数
    //console.log(newOptions);
    
    axios({
      method: method,
      url: url,
      data: data,
      headers: {
        'Content-Type': "application/json;charset=utf-8",
      }
    }).then(res => {
      //根据返回的状态码判断，注意res返回的并不一定都是status，比如小程序就是statusCode
      if (res.status == 200){    
        if( bool ){   
            if( res.data.code != 200 ){ 
              Message({
                message: res.data.msg,
                type: 'error'
              });           
              return;
            }else{
              Message({
                message: res.data.msg,
                type: 'success'
              }); 
            }
           
        }else{
          if( res.data.code != 200){
            Message({
              message:res.data.msg,
              type: 'error'
            });
            return;
          }
        }
        

   
        //这里我们只需要获取返回的data中的数据即可
        resolve(res);
      } else {
        reject(res);
      }
    }).catch(err => {
      reject(err);
    })
  })
};

myAjax.get = async(url,data) => {
  let res = await fun(url,{},false,'get');
  return res;
};  
myAjax.post = async(url,data) => {
  let res = await fun(url,data,true,'post');   //异步无法获取then，所以用async和await 获取，将fun 交给 myAjax.post。
  return res;
};  
myAjax.put = async(url,data) => {
  let res = await fun(url,data,true,'put');
  return res;
};  

myAjax.delete = async(url,data) => {
  let res = await fun(url,{},true,'delete');
  return res;
};  


export default myAjax