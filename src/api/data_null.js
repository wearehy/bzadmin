// this.$data_null(res.data.data);

const  data_null = (res) => {
    if(res.constructor == Array){
        if(res){
            for(let i = 0;i<res.length;i++){
                if(res[i] ){
                    for(let key in res[i]){
                        if(!res[i][key] && res[i][key] != 0 && key.indexOf("image") == -1){
                            res[i][key] = "N/A";
                            
                        }
                    }
                }
                
            }
        }
    }else{
        if(res){
            for(let key in res){
                for(let key2 in res[key]){
                    if(!res[key][key2] && res[key][key2] != 0 && key.indexOf("image") == -1){
                        res[key][key2] = "N/A";
                        
                    }
                }
                
            }
        }
    }
    
    return  res;
    
}

export default data_null;