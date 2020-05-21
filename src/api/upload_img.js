// 上传图片的axios
import {Message} from 'element-ui';
import axios from 'axios' ;

const upload_img = (data) => {
    return new Promise((resolve, reject) => {
    
  
        //这里可以在调用的时候看到你的method、url、data、headers等参数
        //console.log(newOptions);
        axios({
            method:'post',
            url: 'attached/service/attached/upload',
            data: data,
            headers:{
                'Content-Type':'multipart/form-data'
            } 
        }).then(res => {
          //根据返回的状态码判断，注意res返回的并不一定都是status，比如小程序就是statusCode
          if (res.status == 200) {
       
            if( res.data.code != 1){
                Message({
                  message:res.data.msg
                });
                
                return;
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
   
}

export default upload_img