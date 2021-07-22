<template>
   <div>
     <WaiterHeader></WaiterHeader>
     <el-tabs
             :tab-position="'left'"
              style="height: 420px"
              class="menu-tabs"
              type="border-card">
           <el-tab-pane label="特色海鲜">
             <el-row>
               <el-col :span="4" v-for="dish in dishes" v-if="dish.dishType==='特色海鲜'">
                 <el-card style="height: 100%;width: 100%">
                   <div>
                     <img src="dish.dishImage">
                     {{dish.dishName}}
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
           <el-tab-pane label="农家小炒">
             <el-row>
               <el-col :span="4" v-for="dish in dishes" v-if="dish.dishType==='农家小炒'">
                 <el-card style="height: 100%;width: 100%">
                   <div>
                     <img src="dish.dishImage">
                     {{dish.dishName}}
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
                     <img src="dish.dishImage">
                     {{dish.dishName}}
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
                     <img src="dish.dishImage">
                     {{dish.dishName}}
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
                     <img src="dish.dishImage">
                     {{dish.dishName}}
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
                     <img src="dish.dishImage">
                     {{dish.dishName}}
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
       <el-badge :value="deskOrder.dishOrders.length" class="item-button">
         <el-button class="el-button-badge" @click="dialogOrderList='true'"></el-button>
       </el-badge>
     </div>

     <el-dialog
         title="订单详情"
         :visible.sync="dialogOrderList"
         width="500px">
       <el-card v-for="dishOrder in deskOrder.dishOrders" v-if="dishOrder.dishNum!==0">
         {{dishOrder.dishName}}
         {{dishOrder.dishNum}}
       </el-card>
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
      dialogOrderList:false,
      checkedDishes:[],
      deskOrder:{
        deskId:'',
        dishOrders:[]
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
      if(this.deskOrder.dishOrders.length===0){
        this.deskOrder.dishOrders = this.deskOrder.dishOrders.concat({dishId:dish.dishId,dishName:dish.dishName,dishNum:num})
      }else{
        for (let i=0;i<this.deskOrder.dishOrders.length;i++){
          if (this.deskOrder.dishOrders[i].dishId === dish.dishId){
            this.deskOrder.dishOrders[i].dishNum = num
            isOk = '1'
          }
        }
        if(isOk === '0'){
          this.deskOrder.dishOrders = this.deskOrder.dishOrders.concat({dishId:dish.dishId,dishName:dish.dishName,dishNum:num})
        }
      }
      console.log(this.deskOrder.dishOrders)
    }
  }
}
</script>

<style scoped>
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
  margin-top: 540px;
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