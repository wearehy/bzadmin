<template>
  <div>  
    <div  class="img-out" v-if="imgInfo">
      <div class="img-inner">
        <div id="cutbox" :style="{width: imgInfo.type == 'all' ? 2 * width + 'px' : width + 'px'}">
          <div class="leftCloth" v-if="imgInfo.type != 'right'" :style="{width: width + 'px'}">
            <div class="topNumberTop">
              <p class="topTitle">左前</p>
              <p class="numberInfo">{{'EFR-VC-A(' + shoesSize(imgInfo.item.product[imgInfo.index].size).sizetitle + ')'}}</p>
            </div>
            <div class="topNumberCenter">
              <p class="topTitle">左后</p>
              <p class="numberInfo">{{'EFR-VC-A(' + shoesSize(imgInfo.item.product[imgInfo.index].size).sizetitle + ')'}}</p>
            </div>
            <div class="topNumberLeft">
              <p class="topTitle">左内</p>
              <p class="numberInfo">{{'EFR-VC-A(' + shoesSize(imgInfo.item.product[imgInfo.index].size).sizetitle + ')'}}</p>
            </div>
            <div class="topNumberRight">
              <p class="topTitle">左外</p>
              <p class="numberInfo">{{'EFR-VC-A(' + shoesSize(imgInfo.item.product[imgInfo.index].size).sizetitle + ')'}}</p>
            </div>
            <div class="orderInfo">
              <div class="orderTitle">
                <div class="dot"></div>
                订单信息
              </div>
              <div class="orderBody">
                <div class="oneInfo">          			
                  <p><label>订单日期：</label><span class="underline">{{(imgInfo.item.paytime || imgInfo.item.inputtime || imgInfo.item.pushTime) | timeToDay}}</span></p>
                </div>
                <div class="oneInfo">	            			
                  <p><label>订单单号：</label><span class="underline">{{imgInfo.item.ordersn}}</span></p>
                </div>
                <div class="oneInfo">	            			
                  <p><label>平台名称：</label><span class="underline">{{'爆造'}}</span></p>
                </div>
                <div class="oneInfo">	            			
                  <p><label>品牌名称：</label><span class="underline">{{'爆造'}}</span></p>
                </div>
                <div class="oneInfo">	            			
                  <p><label>货品名称：</label><span class="underline">{{'EFR-VC-A'}}</span></p>
                </div>
                <div class="oneInfo">	            			
                  <p><label>货品号码：</label><span class="underline">{{shoesSize(imgInfo.item.product[imgInfo.index].size).sizetitle}}</span></p>
                </div>
                <div class="oneInfo">	            			
                  <p><label>客户名称：</label><span class="underline">{{imgInfo.item.name}}</span></p>
                </div>
                <div class="oneInfo">	            			
                  <p><label>联系电话：</label><span class="underline">{{imgInfo.item.tel}}</span></p>
                </div>
                <div class="oneInfo">	            			
                  <p><label>物流地址：</label><span>{{ imgInfo.item.detail}}</span></p>
                </div>
              </div>
            </div>
            <div class="bottomLogo">
              <span class="logoTitle">后跟标信息</span>
              <span class="logo" v-if="imgInfo.item.product[imgInfo.index].shoesImage.heelword" :style="{fontSize: imgInfo.item.product[imgInfo.index].shoesImage.heelword.length > 4 ? '60px' : '80px', color: getColor(imgInfo.item.product[imgInfo.index].bgcolor).hgbColor}">{{imgInfo.item.product[imgInfo.index].shoesImage.heelword}}</span>
              <span class="logo" v-else> <img v-if="logoImg(imgInfo.item.product[imgInfo.index].shoesImage.bgcolor)" :src="logoImg(imgInfo.item.product[imgInfo.index].shoesImage.bgcolor)"></span>
              <span class="logoSize">爆造后跟底帮15mmx33mm</span>
            </div>
            <div class="allDesign" :style="{width: setCanvas.width + 'px'}">
              <div class="allDesignInner">
                <div class="topDesign" :style="frontStyle()">
                  <img class="lineImg"   :src="baseUrlShoes2 + shoesSize(imgInfo.item.product[imgInfo.index].size).size + '/1-1.png'">
                  <img class="bgImg" v-if="imgInfo.item.product[imgInfo.index].shoesImage.cutfront" :src="$img + imgInfo.item.product[imgInfo.index].shoesImage.cutfront">  
                </div>
                <div class="centerDesign" :style="centerStyle()">
                  <img class="lineImg"  :src="baseUrlShoes2 + shoesSize(imgInfo.item.product[imgInfo.index].size).size + '/2-2.png'">
                  <img class="bgImg" v-if="imgInfo.item.product[imgInfo.index].shoesImage.cutback" :src="$img + imgInfo.item.product[imgInfo.index].shoesImage.cutback">
                </div>
                <div class="bottomBox" :style="bottomStyle()">
                  <div class="leftDesign" :style="bottomWidth()">
                    <img class="lineImg"  :src="baseUrlShoes2 + shoesSize(imgInfo.item.product[imgInfo.index].size).size + '/3-3.png'">
                    <img class="bgImg" v-if="imgInfo.item.product[imgInfo.index].shoesImage.cutin" :src="$img + imgInfo.item.product[imgInfo.index].shoesImage.cutin">	            	
                  </div>
                  <div class="rightDesign" :style="bottomWidth()">
                    <img class="lineImg"  :src="baseUrlShoes2 + shoesSize(imgInfo.item.product[imgInfo.index].size).size + '/4-4.png'">
                    <img class="bgImg" v-if="imgInfo.item.product[imgInfo.index].shoesImage.cutout" :src="$img + imgInfo.item.product[imgInfo.index].shoesImage.cutout">	            	
                  </div>
                </div>
              </div>
            </div>
            <div class="bottomImgBox">
              <div class="thumbnailBox" :style="{width:  5 * setCanvas.smallImgWidth + 4 + 'px'}"> 
                <div :style="{width: setCanvas.smallImgWidth + 'px', height: setCanvas.smallImgHeight + 'px'}"><span>左前</span><div class="left-front"><img :src="$img + imgInfo.item.product[imgInfo.index].shoesImage.screenfront"></div></div>
                <div :style="{width: setCanvas.smallImgWidth + 'px', height: setCanvas.smallImgHeight + 'px'}"><span>右前</span><div class="right-front"><img :src="$img + imgInfo.item.product[imgInfo.index].shoesImage.screenfront"></div></div>
                <div class="backer" :style="{width: setCanvas.smallImgWidth + 'px', height: setCanvas.smallImgHeight + 'px'}"><span>后跟</span><img :src="$img + imgInfo.item.product[imgInfo.index].shoesImage.screenback"></div>
                <div class="outer" :style="{width: setCanvas.smallImgWidth + 'px', height: setCanvas.smallImgHeight + 'px'}"><span>外侧</span><img :src="$img + imgInfo.item.product[imgInfo.index].shoesImage.screenout"></div>
                <div class="inner" :style="{width: setCanvas.smallImgWidth + 'px', height: setCanvas.smallImgHeight + 'px'}"><span>内侧</span><img :src="$img + imgInfo.item.product[imgInfo.index].shoesImage.screenin"></div>            
              </div>
            </div>
          </div>
          <div class="rightCloth" v-if="imgInfo.type != 'left'" :style="{width: width + 'px'}">
            <div class="topNumberTop">
              <p class="topTitle">右前</p>
              <p class="numberInfo">{{'EFR-VC-A(' + shoesSize(imgInfo.item.product[imgInfo.index].size).sizetitle + ')'}}</p>
            </div>
            <div class="topNumberCenter">
              <p class="topTitle">右后</p>
              <p class="numberInfo">{{'EFR-VC-A(' + shoesSize(imgInfo.item.product[imgInfo.index].size).sizetitle + ')'}}</p>
            </div>
            <div class="topNumberLeft">
              <p class="topTitle">右外</p>
              <p class="numberInfo">{{'EFR-VC-A(' + shoesSize(imgInfo.item.product[imgInfo.index].size).sizetitle + ')'}}</p>
            </div>
            <div class="topNumberRight">
              <p class="topTitle">右内</p>
              <p class="numberInfo">{{'EFR-VC-A(' + shoesSize(imgInfo.item.product[imgInfo.index].size).sizetitle + ')'}}</p>
            </div>
            <div class="orderInfo">
              <div class="orderTitle">
                <div class="dot"></div>
                订单信息
              </div>
              <div class="orderBody">
                <div class="oneInfo">          			
                  <p><label>订单日期：</label><span class="underline">{{(imgInfo.item.paytime || imgInfo.item.inputtime || imgInfo.item.push_time) | timeToDay}}</span></p>
                </div>
                <div class="oneInfo">	            			
                  <p><label>订单单号：</label><span class="underline">{{imgInfo.item.ordersn}}</span></p>
                </div>
                <div class="oneInfo">	            			
                  <p><label>平台名称：</label><span class="underline">{{'爆造'}}</span></p>
                </div>
                <div class="oneInfo">	            			
                  <p><label>品牌名称：</label><span class="underline">{{'爆造'}}</span></p>
                </div>
                <div class="oneInfo">	            			
                  <p><label>货品名称：</label><span class="underline">{{'EFR-VC-A'}}</span></p>
                </div>
                <div class="oneInfo">	            			
                  <p><label>货品号码：</label><span class="underline">{{shoesSize(imgInfo.item.product[imgInfo.index].size).sizetitle}}</span></p>
                </div>
                <div class="oneInfo">	            			
                  <p><label>客户名称：</label><span class="underline">{{imgInfo.item.name}}</span></p>
                </div>
                <div class="oneInfo">	            			
                  <p><label>联系电话：</label><span class="underline">{{imgInfo.item.tel}}</span></p>
                </div>
                <div class="oneInfo">	            			
                  <p><label>物流地址：</label><span>{{ imgInfo.item.detail}}</span></p>
                </div>
              </div>
            </div>
            <div class="bottomLogo">
              <span class="logoTitle">后跟标信息</span>
              <span class="logo" v-if="imgInfo.item.product[imgInfo.index].shoesImage.heelword" :style="{fontSize: imgInfo.item.product[imgInfo.index].shoesImage.heelword.length > 4 ? '60px' : '80px', color: getColor(imgInfo.item.product[imgInfo.index].bgcolor).hgbColor}">{{imgInfo.item.product[imgInfo.index].shoesImage.heelword}}</span>
              <span class="logo" v-else><img v-if="logoImg(imgInfo.item.product[imgInfo.index].shoesImage.bgcolor)" :src="logoImg(imgInfo.item.product[imgInfo.index].shoesImage.bgcolor)"></span>
              <span class="logoSize">爆造后跟底帮15mmx33mm</span>
            </div>
            <div class="allDesign" :style="{width: setCanvas.width + 'px'}">
              <div class="allDesignInner">
                <div class="topDesign" :style="frontStyle()">
                  <img class="lineImg"  :src="baseUrlShoes2 + shoesSize(imgInfo.item.product[imgInfo.index].size).size + '/1-1.png'">
                  <img class="bgImg" v-if="imgInfo.item.product[imgInfo.index].shoesImage.cutfront" :src="$img + imgInfo.item.product[imgInfo.index].shoesImage.cutfront">
                </div>
                <div class="centerDesign" :style="centerStyle()">
                  <img class="lineImg"  :src="baseUrlShoes2 + shoesSize(imgInfo.item.product[imgInfo.index].size).size + '/2-2.png'">
                  <img class="bgImg" v-if="imgInfo.item.product[imgInfo.index].shoesImage.cutback" :src="$img + imgInfo.item.product[imgInfo.index].shoesImage.cutback">
                </div>
                <div class="bottomBox" :style="bottomStyle()">
                  <div class="leftDesign" :style="bottomWidth()">
                    <img class="lineImg"  :src="baseUrlShoes2 + shoesSize(imgInfo.item.product[imgInfo.index].size).size + '/3-3.png'">
                    <img class="bgImg" v-if="imgInfo.item.product[imgInfo.index].shoesImage.cutin" :src="$img + imgInfo.item.product[imgInfo.index].shoesImage.cutin">                
                  </div>
                  <div class="rightDesign" :style="bottomWidth()">
                    <img class="lineImg"  :src="baseUrlShoes2 + shoesSize(imgInfo.item.product[imgInfo.index].size).size + '/4-4.png'">
                    <img class="bgImg" v-if="imgInfo.item.product[imgInfo.index].shoesImage.cutout" :src="$img + imgInfo.item.product[imgInfo.index].shoesImage.cutout">                
                  </div>
                </div>
              </div>
            </div>
            <div class="bottomImgBox">
              <div class="thumbnailBox" :style="{width:  5 * setCanvas.smallImgWidth + 4 + 'px'}"> 
                <div :style="{width: setCanvas.smallImgWidth + 'px', height: setCanvas.smallImgHeight + 'px'}"><span>左前</span><div class="left-front"><img :src="$img + imgInfo.item.product[imgInfo.index].shoesImage.screenfront"></div></div>
                <div :style="{width: setCanvas.smallImgWidth + 'px', height: setCanvas.smallImgHeight + 'px'}"><span>右前</span><div class="right-front"><img :src="$img + imgInfo.item.product[imgInfo.index].shoesImage.screenfront"></div></div>
                <div class="backer" :style="{width: setCanvas.smallImgWidth + 'px', height: setCanvas.smallImgHeight + 'px'}"><span>后跟</span><img :src="$img + imgInfo.item.product[imgInfo.index].shoesImage.screenback"></div>
                <div class="outer" :style="{width: setCanvas.smallImgWidth + 'px', height: setCanvas.smallImgHeight + 'px'}"><span>外侧</span><img :src="$img + imgInfo.item.product[imgInfo.index].shoesImage.screenout"></div>
                <div class="inner" :style="{width: setCanvas.smallImgWidth + 'px', height: setCanvas.smallImgHeight + 'px'}"><span>内侧</span><img :src="$img + imgInfo.item.product[imgInfo.index].shoesImage.screenin"></div>            
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    
</template>
<script>
  import html2canvas from 'html2canvas';
  // import $ from 'jquery'
	export default {
    
    data() {
    	return {
        loading: false,
    		baseUrlShoes: '/images/shoes',
    		baseUrlShoes2: '/images/shoes/',
    		setCanvas: {
          offsetTop: 34,
          topTopBlank: 0,
          topBottomBlank: 810,
          centerTopBlank: 740,
          centerBottomBlank: 690,
          bottomTopBlank: 1290,
          bottomBottomBlank: 0,
          baseSize: 2000,
          smallImgWidth: 586,
          smallImgHeight: 280
    		},
        baseWH: {
          front: {
            width: 1530,
            height: 1250 
          },
          center: {
            width: 1150,
            height: 518
          },
          bottom: {
            width: 1120,
            height: 550
          }
        },
        width: 0,
    		imgInfo: null,
    		load: false
    	}
    },
    watch: {
      createimg(){
        this.imgInfo = this.createimg;
      	if(this.createimg && this.load){
          this.width =  this.shoesResize(this.imgInfo.item.product[this.imgInfo.index].size).front.width + 300 > (6 + this.setCanvas.smallImgWidth) * 5 ? this.shoesResize(this.imgInfo.item.product[this.imgInfo.index].size).front.width + 300 : (6 + this.setCanvas.smallImgWidth) * 5;
      		// this.$nextTick(function() {
		      //    this.createCanvas()
		      // })
      	} 
      }
    },
    props:['createimg'],
    filters:{
      timeToDay:function(value){
          if (!value) return ''

          let times = new Date( value*1000 );
          let YY = times.getFullYear();
          let MM = times.getMonth() + 1;
          let DD = times.getDate();
          let hh = times.getHours();
          let mm = times.getMinutes();
          let ss = times.getSeconds();
          if(MM<10){MM = '0'+MM}
          if(DD<10){DD = '0'+DD}
          if(hh<10){hh = '0'+hh}
          if(mm<10){mm = '0'+mm}
          if(ss<10){ss = '0'+ss}
          return `${YY}-${MM}-${DD}`;

      }


    },
    methods: {
      
      getColor(bgcolor) {
        if(bgcolor) {
          return JSON.parse(bgcolor)
        }
      },
      logoImg(color) {
        let [url, imgtype] = ['/images/shoes/logo/', '.png']
        if(color) {
          let bgcolor = this.getColor(color);
          if(bgcolor.hgbColor)
            return url + bgcolor.hgbColor.substring(1) + imgtype
        }
        return false
      },
      centerStyle() {
        return {
          marginTop: -(this.setCanvas.topBottomBlank * this.shoesResize(this.imgInfo.item.product[this.imgInfo.index].size).front.height / this.baseWH.front.height + this.setCanvas.centerTopBlank * this.shoesResize(this.imgInfo.item.product[this.imgInfo.index].size).center.height / this.baseWH.center.height) + 40 + 'px', 
          marginLeft: (this.width-this.setCanvas.baseSize * this.shoesResize(this.imgInfo.item.product[this.imgInfo.index].size).center.width / this.baseWH.center.width)/2 + 'px',
          width: this.setCanvas.baseSize * this.shoesResize(this.imgInfo.item.product[this.imgInfo.index].size).center.width / this.baseWH.center.width + 'px',
          height: this.setCanvas.baseSize * this.shoesResize(this.imgInfo.item.product[this.imgInfo.index].size).center.height / this.baseWH.center.height + 'px'
        }
      },
      bottomStyle() {
        return {
          marginTop: -(this.setCanvas.centerBottomBlank * this.shoesResize(this.imgInfo.item.product[this.imgInfo.index].size).center.height / this.baseWH.center.height + this.setCanvas.bottomTopBlank * this.shoesResize(this.imgInfo.item.product[this.imgInfo.index].size).bottom.height / this.baseWH.bottom.height) + 40 + 'px',
          marginLeft: (this.width-this.setCanvas.baseSize * this.shoesResize(this.imgInfo.item.product[this.imgInfo.index].size).bottom.width / this.baseWH.bottom.width)/2 + 'px', 
          width: this.setCanvas.baseSize * this.shoesResize(this.imgInfo.item.product[this.imgInfo.index].size).bottom.width / this.baseWH.bottom.width + 'px',
          height: this.setCanvas.baseSize * this.shoesResize(this.imgInfo.item.product[this.imgInfo.index].size).bottom.height / this.baseWH.bottom.height + 'px'
        }
      },
      bottomWidth() {
        return {
          width: this.setCanvas.baseSize * this.shoesResize(this.imgInfo.item.product[this.imgInfo.index].size).bottom.width / this.baseWH.bottom.width + 'px',
          height: this.setCanvas.baseSize * this.shoesResize(this.imgInfo.item.product[this.imgInfo.index].size).bottom.height / this.baseWH.bottom.height + 'px'
        }
      },
      frontStyle() {
        return {
          marginTop: -this.setCanvas.topTopBlank * this.shoesResize(this.imgInfo.item.product[this.imgInfo.index].size).front.height / this.baseWH.front.height + 40 + 'px', 
          marginLeft: (this.width - this.setCanvas.baseSize * this.shoesResize(this.imgInfo.item.product[this.imgInfo.index].size).front.width / this.baseWH.front.width)/2 + this.setCanvas.offsetTop * this.shoesResize(this.imgInfo.item.product[this.imgInfo.index].size).front.width / this.baseWH.front.width + 'px',
          width: this.setCanvas.baseSize * this.shoesResize(this.imgInfo.item.product[this.imgInfo.index].size).front.width / this.baseWH.front.width + 'px', 
          height: this.setCanvas.baseSize * this.shoesResize(this.imgInfo.item.product[this.imgInfo.index].size).front.height / this.baseWH.front.height + 'px'
        }
      },
      
      shoesResize(size) {
        size = size.split('\(')[0];
        switch(size) {
          case '44':
            return {
              front: {
                width: 3084,
                height: 2533
              },
              center: {
                width: 2065,
                height: 925
              },
              bottom: {
                width: 2402,
                height: 1168
              }
            };
          case '43':
            return {
              front: {
                width: 2980,
                height: 2429 
              },
              center: {
                width: 2000,
                height: 900
              },
              bottom: {
                width: 2305,
                height: 1132
              }
            };
          case '42':
            return {
              front: {
                width: 2898,
                height: 2368 
              },
              center: {
                width: 1956,
                height: 882
              },
              bottom: {
                width: 2240,
                height: 1090
              }
            };
          case '41':
            return {
              front: {
                width: 2850,
                height: 2334 
              },
              center: {
                width: 1940,
                height: 875
              },
              bottom: {
                width: 2210,
                height: 1078
              }
            }; 
          case '40':
            return {
              front: {
                width: 2780,
                height: 2252 
              },
              center: {
                width: 1890,
                height: 855
              },
              bottom: {
                width: 2144,
                height: 1050
              }
            };
          case '39':
            return {
              front: {
                width: 2746,
                height: 2236 
              },
              center: {
                width: 1866,
                height: 845
              },
              bottom: {
                width: 2115,
                height: 1036
              }
            };
          case '38':
            return {
              front: {
                width: 2666,
                height: 2164 
              },
              center: {
                width: 1823,
                height: 836
              },
              bottom: {
                width: 2050,
                height: 1000
              }
            };
          case '37':
            return {
              front: {
                width: 2616,
                height: 2134 
              },
              center: {
                width: 1810,
                height: 824
              },
              bottom: {
                width: 2020,
                height: 984
              }
            };
          case '36':
            return {
              front: {
                width: 2525,
                height: 2070 
              },
              center: {
                width: 1760,
                height: 800
              },
              bottom: {
                width: 1955,
                height: 955
              }
            };
          case '35':
            return {
              front: {
                width: 2445,
                height: 2000
              },
              center: {
                width: 1718,
                height: 775
              },
              bottom: {
                width: 1885,
                height: 925
              }
            };
        }
      },
      
      shoesSize(size) {
        size = size.split('\(')[0];
        switch(size) {
          case '44':
            return {sizetitle: '44# (USA10.5#)',
            size: 44
          };
          case '43':
            return {sizetitle: '43# (USA10.0#)',
            size: 43
          };
          case '42':
            return {sizetitle: '42# (USA9.0#)',
            size: 42
          };
          case '41':
            return {sizetitle: '41# (USA8.5#)',
            size: 41
          }; 
          case '40':
            return {sizetitle: '40# (USA7.5#)',
            size: 40
          };
          case '39':
            return {sizetitle: '39# (USA7.0#)',
            size: 39
          };
          case '38':
            return {sizetitle: '38# (USA6.0#)',
            size: 38
          };
          case '37':
            return {sizetitle: '37# (USA5.5#)',
            size: 37
          };
          case '36':
            return {sizetitle: '36# (USA4.5#)',
            size: 36
          };
          case '35':
            return {sizetitle: '35# (USA4.0#)',
            size: 35
          };
        }
      },
     
    },
    mounted() {
      this.load = true;
    }
	}

function dataURLtoBlob(dataurl) {
 

  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
  bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  var haspHYs = false;
  for(var i = 0 ; i < u8arr.length - 4; i++){
    if(u8arr[i] == 112 && u8arr[i + 1] == 72 && u8arr[i + 2] == 89 && u8arr[i + 3] == 115){
      haspHYs = true;
    }
  }
  
  
  if(!haspHYs){
    var arr = Array.from(u8arr),
    header = arr.slice(0, 33),
    footer = arr.slice(33),
    pHYs_length = [0, 0, 0, 9],
    pHYs_name = [112, 72, 89, 115],
    pHYs_X = [0, 0, 46, 35],
    pHYs_Y = [0, 0, 46, 35], // 11811 2e23
    pHYs_unit = [1];
    console.log(333,new Uint8Array(pHYs_name.concat(pHYs_X, pHYs_Y, pHYs_unit)));
    pHYs_crc = crc32(new Uint8Array(pHYs_name.concat(pHYs_X, pHYs_Y, pHYs_unit))); //78a53f76
    
    var pHYs_crc1 = pHYs_crc.substring(0,2),
    pHYs_crc2 = pHYs_crc.substring(2,4),
    pHYs_crc3 = pHYs_crc.substring(4,6),
    pHYs_crc4 = pHYs_crc.substring(6);
    pHYs_crc = [parseInt(pHYs_crc1, 16), parseInt(pHYs_crc2, 16), parseInt(pHYs_crc3, 16), parseInt(pHYs_crc4, 16)];
    var all_u8arr = new Uint8Array(header.concat(pHYs_length, pHYs_name, pHYs_X, pHYs_Y, pHYs_unit, pHYs_crc, footer));
    return new Blob([all_u8arr], {type:mime});
  }
  
} 

function loadImg(url) {
  return new Promise (function(resolve, reject) {
  	let img = new Image();
  	img.src = url;
  	img.onload = function(img){
      resolve(img);
  	}
  	img.onerror = function(){
      reject(false);
  	}
  })
}
</script>
<style scoped>
  .topDesign,.centerDesign{
    width: 100%;
   	position: relative;
  }

  .leftDesign,.rightDesign{
     width: 100%;
   	position: absolute;
  }

  #cutbox{
    font-size: 36px;
    padding-bottom: 40px;
    height: auto;
  }

  #cutbox:after{
    content: '';
    display: block;
    clear: both;
  }

  #cutbox img{
   	display: block;
  }

  .lineImg{
   	position: relative;
    z-index: 999;
  }

  .bgImg{
    position: absolute;
    z-index: 998;
    left: 0;
    top: 0;
  }

  .leftCloth,.rightCloth{
   	position: relative;
   	float: left;
   	box-sizing: border-box;
  }

  .allDesign{
   	width: 100%;
   	position: relative;
  }

  .allDesignInner{
   	width: 100%;
   	position: relative;
  }

  .allDesignInner img{
    display: block;
    width: 100%;
    height: 100%;
  }

  .leftCloth .allDesign .allDesignInner{
    -webkit-transform: rotateY(180deg);
   	-moz-transform: rotateY(180deg);
   	-ms-transform: rotateY(180deg);
   	-o-transform: rotateY(180deg);
   	transform: rotateY(180deg);
  }

  .img-out{
    color: #000;
   
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    
    overflow: hidden;
    background-color: rgba(0,0,0,0);
  }

  .img-inner{
    width: 100%;
    height: 100%;
    opacity: 1;
  }

  .topNumberTop,.topNumberCenter,.topNumberLeft,.topNumberRight{
   	z-index: 100;
   	padding: 15px;
   	border-radius: 4px;
   	position: absolute;
   	text-align: center;
   	background-color: #fff;
   	color: #ff0000;
  }

  .topTitle{
   	font-weight: bold;
  }

  .topDesign,.centerDesign{
    -webkit-transform: rotateZ(180deg);
    -moz-transform: rotateZ(180deg);
    -ms-transform: rotateZ(180deg);
    -o-transform: rotateZ(180deg);
    transform: rotateZ(180deg);
    position: relative;
    margin: 0 auto;
  }

  .centerDesign{
    margin-top: -80%;
  }
   
  .topNumberTop,.topNumberCenter{
    left: 50%;
    -webkit-transform: translate(-50%,0);
    -moz-transform: translate(-50%,0);
    -ms-transform: translate(-50%,0);
    -o-transform: translate(-50%,0);
    transform: translate(-50%,0);
  }

  .topNumberTop{
   	top: 4%;
  }

  .topNumberCenter{
    top: 49%;
  }

  .bottomBox{
   	position: relative;
   	width: 100%;
    margin-top: -95%;
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    -ms-transform: rotateY(180deg);
    -o-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }

  .bottomBox:after{
    display: block;
    content: '';
    clear: both;
  }

  .leftDesign{
   	position: relative;
   	float: left;
    margin-left: -29.5%;
    -webkit-transform: rotateZ(78deg) rotateX(180deg);
    -moz-transform: rotateZ(78deg) rotateX(180deg);
    -ms-transform: rotateZ(78deg) rotateX(180deg);
    -o-transform: rotateZ(78deg) rotateX(180deg);
    transform: rotateZ(78deg) rotateX(180deg);
  }

  .rightDesign{
    position: absolute;
    right: -29.5%;
    top: 0;
    -webkit-transform: rotateZ(-78deg) rotateX(180deg);
    -moz-transform: rotateZ(-78deg) rotateX(180deg);
    -ms-transform: rotateZ(-78deg) rotateX(180deg);
    -o-transform: rotateZ(-78deg) rotateX(180deg);
    transform: rotateZ(-78deg) rotateX(180deg);
  }

  .topNumberLeft{
    left: 23%;
    top: 70%;
    -webkit-transform: rotateZ(90deg);
    -moz-transform: rotateZ(90deg);
    -ms-transform: rotateZ(90deg);
    -o-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
  }

  .topNumberRight{
    right: 23%;
    top: 70%;
    -webkit-transform: rotateZ(-90deg);
    -moz-transform: rotateZ(-90deg);
    -ms-transform: rotateZ(-90deg);
    -o-transform:rotateZ(-90deg);
    transform: rotateZ(-90deg);
  }

  .orderInfo{
    position: absolute;
    left: 50%;
    top: 66%;
    border-radius: 4px;
    z-index: 99999;
    box-sizing: border-box;
    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    -o-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    border: 2px solid #666;
    background-color: #fff;
  }

  .bottomLogo{
    position: absolute;
    left: 50%;
    top: 84%;
    width: 390px;
    text-align: center;
    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    -o-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }

  .logoTitle{
    padding: 5px 0;
    width: 100%;
    font-size: 50px;
    font-weight: bold;
    display: inline-block;
  }
 
  .logo{
    background-color: #fff;
    border: 2px solid #666;
    height: 178px;
    letter-spacing: 3px;
    line-height: 178px;
    font-size: 38px;
    font-weight: bold;
    display: inline-block;
    width: 100%;
  }

  #cutbox .logo>img{
    padding-top: 6px;
    display: inline-block;
    width: 85%;
  }

  .logoSize{
    display: inline-block;
    padding-top: 5px;
    font-size: 28px;
    letter-spacing: 1px;
  }

  .bottomImgBox{
    margin-top: 40px;
    position: relative;   
    width: 100%;
  }

  .bottomImgBox>.thumbnailBox{
    position: relative;
    margin: 0 auto;
    border:2px solid #666;
  }

  .bottomImgBox>.thumbnailBox:before{
    position: absolute;
    z-index: 999999;
    right: 20px;
    top: 20px;
    content: '';
    width: 35px;
    height: 35px;
    border: 4px solid #000;
    border-radius: 50%;
  }

  .bottomImgBox>.thumbnailBox:after{
    display: block;
    content: '';
    clear: both;
  }

  .bottomImgBox>.thumbnailBox>div{
    float: left;
    position: relative;
    border:2px solid #666;
  }

  .bottomImgBox>.thumbnailBox>div>img,.bottomImgBox>.thumbnailBox .left-front>img, .bottomImgBox>.thumbnailBox .right-front>img{
    position: absolute;
    width: 100%;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }

  .bottomImgBox>.thumbnailBox>div>img{
    top: 60%;
  }

  .bottomImgBox>.thumbnailBox>div>span{
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 999;
  }

  .bottomImgBox>.thumbnailBox .left-front{
    position: relative;
    width: 100%;
    height: 100%;
    -webkit-transform: rotateX(180deg) rotateZ(90deg);
    -moz-transform: rotateX(180deg) rotateZ(90deg);
    -ms-transform: rotateX(180deg) rotateZ(90deg);
    -o-transform: rotateX(180deg) rotateZ(90deg);
    transform: rotateX(180deg) rotateZ(90deg);
  }

  .bottomImgBox>.thumbnailBox .right-front{
    position: relative;
    width: 100%;
    height: 100%;
    -webkit-transform: rotateZ(90deg);
    -moz-transform: rotateZ(90deg);
    -ms-transform: rotateZ(90deg);
    -o-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
  }

  .orderInfo p{
   	margin-top: 10px;
   	line-height: 50px;
  }

  .oneInfo{
   	width: 580px;
  }

  .orderInfo p span.underline{
   	width: calc(100% - 200px);
   	position: relative;
   	display: inline-block;
  }

  .orderTitle{
   	position: relative;
   	text-align: center;
   	padding: 10px 0;
   	font-size: 50px;
   	font-weight: bold;
  }

  .orderTitle:after, .orderInfo p span.underline:after{
    position: absolute;
    content: '';
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #999;
  }

  .orderTitle .dot{
   	position: absolute;
   	content: '';
    left: 30px;
    top: 50%;
    border: 4px solid #e60012;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    z-index: 99999;
    -webkit-transform: translate(0, -50%);
    -moz-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    -o-transform: translate(0, -50%);
    transform: translate(0, -50%);
  }

  .orderBody{
   	padding: 15px;
  }
</style>