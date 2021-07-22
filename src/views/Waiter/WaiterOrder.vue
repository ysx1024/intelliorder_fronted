<template>
   <div>
     <WaiterHeader></WaiterHeader>
     <el-input class="el-input-table" v-model="deskOrder.deskId" placeholder="请输入桌号"></el-input>
     <el-tabs
             :tab-position="'left'"
              style="height: 420px"
              class="menu-tabs"
              type="border-card">
           <el-tab-pane label="地方名吃">
             <el-row>
               <el-col :span="4" v-for="dish in dishes" v-if="dish.dishType==='地方名吃'">
                 <el-card style="height: 100%;width: 100%">
                   <div>
                     <div>
                       <img src="https://tse4-mm.cn.bing.net/th/id/OIP-C.7014yYigzMDRzK1RjH0iZwHaH1?w=203&h=215&c=7&o=5&dpr=1.25&pid=1.7"
                       class="img-2">
                     </div>
                     <div>{{dish.dishName}}</div>
                     <div>{{dish.dishPrice}}</div>
                     <el-input-number v-model="dish.num"
                                      @change="handleChange(dish.num,dish)"
                                      class="number-2"
                                      size="mini"
                                      :min="0" :max="10" label="描述文字">
                     </el-input-number>
                   </div>
                 </el-card>
               </el-col>
             </el-row>
           </el-tab-pane>
       <el-tab-pane label="特色海鲜">
         <el-row>
           <el-col :span="4" v-for="dish in dishes" v-if="dish.dishType==='特色海鲜'">
             <el-card style="height: 100%;width: 100%">
               <div>
                 <div>
                   <img src="https://tse4-mm.cn.bing.net/th/id/OIP-C.7014yYigzMDRzK1RjH0iZwHaH1?w=203&h=215&c=7&o=5&dpr=1.25&pid=1.7"
                        class="img-2">
                 </div>
                 <div>{{dish.dishName}}</div>
                 <div>{{dish.dishPrice}}</div>
                 <el-input-number v-model="dish.num"
                                  @change="handleChange(dish.num,dish)"
                                  size="mini"
                                  :min="0" :max="10" label="描述文字">
                 </el-input-number>
               </div>
             </el-card>
           </el-col>
         </el-row>
       </el-tab-pane>
           <el-tab-pane label="农家小炒">
             <el-row>
               <el-col :span="4" v-for="dish in dishes" v-if="dish.dishType==='农家小炒'">
                 <el-card style="height: 100%;width: 100%">
                   <div>
                     <div>
                       <img src="https://tse4-mm.cn.bing.net/th/id/OIP-C.7014yYigzMDRzK1RjH0iZwHaH1?w=203&h=215&c=7&o=5&dpr=1.25&pid=1.7"
                            class="img-2">
                     </div>
                     <div>{{dish.dishName}}</div>
                     <div>{{dish.dishPrice}}</div>
                     <el-input-number v-model="dish.num"
                                      @change="handleChange(dish.num,dish)"
                                      size="mini"
                                      :min="0" :max="10" label="描述文字">
                     </el-input-number>
                   </div>
                 </el-card>
               </el-col>
             </el-row>
           </el-tab-pane>
           <el-tab-pane label="精品甜点">
             <el-row>
               <el-col :span="4" v-for="dish in dishes" v-if="dish.dishType==='精品甜点'">
                 <el-card style="height: 100%;width: 100%">
                   <div>
                     <div>
                       <img src="https://tse4-mm.cn.bing.net/th/id/OIP-C.7014yYigzMDRzK1RjH0iZwHaH1?w=203&h=215&c=7&o=5&dpr=1.25&pid=1.7"
                            class="img-2">
                     </div>
                     <div>{{dish.dishName}}</div>
                     <div>{{dish.dishPrice}}</div>
                     <el-input-number v-model="dish.num"
                                      @change="handleChange(dish.num,dish)"
                                      size="mini"
                                      :min="0" :max="10" label="描述文字">
                     </el-input-number>
                   </div>
                 </el-card>
               </el-col>
             </el-row>
           </el-tab-pane>
           <el-tab-pane label="原味炖汤">
             <el-row>
               <el-col :span="4" v-for="dish in dishes" v-if="dish.dishType==='原味炖汤'">
                 <el-card style="height: 100%;width: 100%">
                   <div>
                     <div>
                       <img src="https://tse4-mm.cn.bing.net/th/id/OIP-C.7014yYigzMDRzK1RjH0iZwHaH1?w=203&h=215&c=7&o=5&dpr=1.25&pid=1.7"
                            class="img-2">
                     </div>
                     <div>{{dish.dishName}}</div>
                     <div>{{dish.dishPrice}}</div>
                     <el-input-number v-model="dish.num"
                                      @change="handleChange(dish.num,dish)"
                                      size="mini"
                                      :min="0" :max="10" label="描述文字">
                     </el-input-number>
                   </div>
                 </el-card>
               </el-col>
             </el-row>
           </el-tab-pane>
           <el-tab-pane label="主食">
             <el-row>
               <el-col :span="4" v-for="dish in dishes" v-if="dish.dishType==='主食'">
                 <el-card style="height: 100%;width: 100%">
                   <div>
                     <div>
                       <img src="https://tse4-mm.cn.bing.net/th/id/OIP-C.7014yYigzMDRzK1RjH0iZwHaH1?w=203&h=215&c=7&o=5&dpr=1.25&pid=1.7"
                            class="img-2">
                     </div>
                     <div>{{dish.dishName}}</div>
                     <div>{{dish.dishPrice}}</div>
                     <el-input-number v-model="dish.num"
                                      @change="handleChange(dish.num,dish)"
                                      size="mini"
                                      :min="0" :max="10" label="描述文字">
                     </el-input-number>
                   </div>
                 </el-card>
               </el-col>
             </el-row>
           </el-tab-pane>
           <el-tab-pane label="酒水饮料">
             <el-row>
               <el-col :span="4" v-for="dish in dishes" v-if="dish.dishType==='酒水饮料'">
                 <el-card style="height: 100%;width: 100%">
                   <div>
                     <div>
                       <img src="https://tse4-mm.cn.bing.net/th/id/OIP-C.7014yYigzMDRzK1RjH0iZwHaH1?w=203&h=215&c=7&o=5&dpr=1.25&pid=1.7"
                            class="img-2">
                     </div>
                     <div>{{dish.dishName}}</div>
                     <div>{{dish.dishPrice}}</div>
                     <el-input-number v-model="dish.num"
                                      @change="handleChange(dish.num,dish)"
                                      size="mini"
                                      :min="0" :max="10" label="描述文字">
                     </el-input-number>
                   </div>
                 </el-card>
               </el-col>
             </el-row>
           </el-tab-pane>
         </el-tabs>
     <div>
       <el-badge :value="dishesNumber" class="item-button">
         <el-button class="el-button-badge" @click="dialogOrderList=true">{{deskOrder.totalPrice}}</el-button>
       </el-badge>
     </div>
     <el-dialog
         :visible.sync="dialogOrderList"
         width="500px">
       <div>{{deskOrder.deskId}}号桌</div>
       <el-card v-for="dishOrder in deskOrder.dishOrders" v-if="dishOrder.dishNum!==0">
         {{dishOrder.dishName}}
         {{dishOrder.dishNum}}
       </el-card>
       <el-button type="warning" @click="dialogOrderList=false;submitDeskOrder(deskOrder);successIf=true">确认提交</el-button>
     </el-dialog>
     <el-dialog
         :visible.sync="successIf"
         width="500px">
       {{message}}
     </el-dialog>
   </div>
</template>

<script>
import WaiterHeader from "@/components/WaiterHeader";
export default {
  name: "WaiterOrder",
  components: {WaiterHeader},
  data() {
    return {
      //订单详细弹窗
      dialogOrderList:false,
      //提交订单反馈弹窗
      successIf:false,
      //存储提交订单情况-是否成功
      message:"",
      dishesNumber:'',
      deskOrder:{
        deskId:'',
        dishOrders:[],
        totalPrice:0
      },
      dishes:[{
        dishId:'',
        dishName:'',
        dishType:'',
        saleTime:'',
        dishPrice:'',
        dishImage:'',
        dishDesc:'',
        costPrice:'',
        dishState:''
      }]
    }
  },
  mounted() {
    var path = "/Data/dishes.json"
    this.axios.get(path).then((response)=>{
      this.dishes=response.data.data
    })
  },
  methods: {
    handleChange(num,dish) {
      var isOk = '0'
      //存储临时数据的对应变量
      var totalPrice = 0
      var dishesNumber = 0
      if(this.deskOrder.dishOrders.length===0){
        this.deskOrder.dishOrders = this.deskOrder.dishOrders.concat({dishId:dish.dishId,dishPrice:dish.dishPrice,dishName:dish.dishName,dishNum:num})
      }else{
        for (let i=0;i<this.deskOrder.dishOrders.length;i++){
          if (this.deskOrder.dishOrders[i].dishId === dish.dishId){
            this.deskOrder.dishOrders[i].dishNum = num
            isOk = '1'
          }
        }
        if(isOk === '0'){
          this.deskOrder.dishOrders = this.deskOrder.dishOrders.concat({dishId:dish.dishId,dishPrice:dish.dishPrice,dishName:dish.dishName,dishNum:num})
        }
      }
      for(let i=0;i<this.deskOrder.dishOrders.length;i++){
        totalPrice=parseInt(totalPrice)+parseInt(this.deskOrder.dishOrders[i].dishNum)*parseInt(this.deskOrder.dishOrders[i].dishPrice)
        dishesNumber = parseInt(dishesNumber)+parseInt(this.deskOrder.dishOrders[i].dishNum)
      }
      //将临时变量的数据传给全局变量
      this.deskOrder.totalPrice = totalPrice
      this.dishesNumber = dishesNumber


    },
    submitDeskOrder(deskOrder){

    }
  }
}
</script>

<style scoped>
.el-input-table{
  width: 200px;
  margin: 0 auto;
}
.img-2{
  width: 40px;
  height: 40px;
}
.menu-tabs{
  position: absolute;
  bottom: 0;
  top:200px;
  left: 30px;
  right: 30px;
  height: 420px;
  overflow-y: auto;
}
.item-button{
  width: 100px;
  height: 40px;
  margin-top: 480px;
}
.el-button-badge{
  width: 100px;
  height: 40px;
  background-image: url("../../assets/cart-Empty.png");
  background-size: 40px;
  background-position: left;
  background-repeat: no-repeat;
}
</style>