// this.$split(res.data.data);
// 将 [1,2,3]  变为 "1 | 2 | 3"
const  split = (res) => {
   
    for(let i = 0;i<res.length;i++){
        for(let key in res[i]){
            // console.log(res[i][key])
            if( res[i][key] instanceof Array){
                res[i][key+'2'] = res[i][key].join(' | ');
                
                

            }
            
        }
    }

    return  res;
    
}

export default   split;
