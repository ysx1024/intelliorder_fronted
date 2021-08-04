<template>
   <div>
     <WaiterHeader></WaiterHeader>
     <el-form class="el-form-1" label-width="200px">
       <tr>
         &nbsp;&nbsp;
       </tr>
       <tr>
         <el-form-item label="桌号">
           <el-input class="el-input-table" v-model="deskOrder.deskId"  placeholder="请输入桌号"></el-input>
         </el-form-item>
       </tr>
     </el-form>
     <el-tabs
             :tab-position="'left'"
              style="height: 420px"
              class="menu-tabs"
              type="border-card">

           <el-tab-pane label="招牌必点">
             <el-row>
               <el-col :span="4" v-for="dish in dishes" v-if="dish.dishType==='招牌必点'">
                 <el-card style="height: 90%; width: 90%;" >
                   <div>

<!--                     <div class="demo-image">-->
<!--                       <div class="block" v-for="fit in fits" :key="fit">-->
<!--                         <span class="demonstration">{{ fit }}</span>-->
                         <el-image
                             style="width: 100px; height: 100px"
                             :src="dish.dishImage">
                     </el-image>
<!--                             :fit="fit"></el-image>-->
<!--                       </div>-->

                     <div style="font-size: 10px;">{{dish.dishName}}</div>
                     <div style="font-size: 10px;">{{dish.dishPrice}}</div>
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

       <el-tab-pane label="开胃凉菜">
         <el-row>
           <el-col :span="4" v-for="dish in dishes" v-if="dish.dishType==='开胃凉菜'">
             <el-card style="height: 90%; width: 90%;" >
               <div>
                 <el-image
                     style="width: 100px; height: 100px"
                     :src="dish.dishImage">
                 </el-image>
                 <div style="font-size: 10px;">{{dish.dishName}}</div>
                 <div style="font-size: 10px;">{{dish.dishPrice}}</div>
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

       <el-tab-pane label="特色主食">
         <el-row>
           <el-col :span="4" v-for="dish in dishes" v-if="dish.dishType==='特色主食'">
             <el-card style="height: 90%; width: 90%;" >
               <div>
                 <el-image
                     style="width: 100px; height: 100px"
                     :src="dish.dishImage">
                 </el-image>
                 <div style="font-size: 10px;">{{dish.dishName}}</div>
                 <div style="font-size: 10px;">{{dish.dishPrice}}</div>
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
       <el-tab-pane label="精致甜点">
         <el-row>
           <el-col :span="4" v-for="dish in dishes" v-if="dish.dishType==='精致甜点'">
             <el-card style="height: 90%; width: 90%;" >
               <div>
                 <el-image
                     style="width: 100px; height: 100px"
                     :src="dish.dishImage">
                 </el-image>
                 <div style="font-size: 10px;">{{dish.dishName}}</div>
                 <div style="font-size: 10px;">{{dish.dishPrice}}</div>
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
       <el-tab-pane label="新鲜水果">
         <el-row>
           <el-col :span="4" v-for="dish in dishes" v-if="dish.dishType==='新鲜水果'">
             <el-card style="height: 90%; width: 90%;" >
               <div>
                 <el-image
                     style="width: 100px; height: 100px"
                     :src="dish.dishImage">
                 </el-image>
                 <div style="font-size: 10px;">{{dish.dishName}}</div>
                 <div style="font-size: 10px;">{{dish.dishPrice}}</div>
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
       <el-tab-pane label="夏日饮品">
         <el-row>
           <el-col :span="4" v-for="dish in dishes" v-if="dish.dishType==='夏日饮品'">
             <el-card style="height: 90%; width: 90%;" >
               <div>
                 <el-image
                     style="width: 100px; height: 100px"
                     :src="dish.dishImage">
                 </el-image>
                 <div style="font-size: 10px;">{{dish.dishName}}</div>
                 <div style="font-size: 10px;">{{dish.dishPrice}}</div>
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


         </el-tabs>
     <div>
       <el-badge :value="dishesNumber" class="item-button">
         <el-button class="el-button-badge" @click="dialogOrderList=true">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{deskOrder.totalPrice}}</el-button>
       </el-badge>
     </div>
     <el-dialog
         :visible.sync="dialogOrderList"
         width="500px">
       <div style="font-size: 14px; width: 32%;" >{{deskOrder.deskId}}号桌</div>
       <tr>
         &nbsp;&nbsp;
       </tr>
       <tr>
         &nbsp;&nbsp;
       </tr>
<!--       <el-card v-for="dishOrder in deskOrder.dishOrders" v-if="dishOrder.dishNum!==0">-->
<!--         {{dishOrder.dishName}}-->
<!--         {{dishOrder.dishNum}}-->
<!--       </el-card>-->
<!--       <div v-for="dishOrder in deskOrder.dishOrders" v-if="dishOrder.dishNum!==0">-->
<!--         <div class="dishOrder" label-width="200px">{{dishOrder.dishName}}-->
<!--           {{dishOrder.dishNum}}-->
<!--         </div>-->
       <el-table
           :data="deskOrder.dishOrders"

           style="width: 80% ; margin-left: 10%;font-size: 10px;"
           >
         <el-table-column
             prop="dishName"
             label="菜品"
             width="180">
         </el-table-column>
         <el-table-column
             prop="dishNum"
             label="数量">
         </el-table-column>
         <el-table-column
             prop="dishPrice"
             label="价格（元）">
         </el-table-column>
       </el-table>
       <el-form class="el-form-1" style="width: 80% ; margin-left: 12% ; font-size: 13px" align="left" label-width="200px" >
         <el-form-item class="el-form-item1"  label="总计：" label-width="15%">
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;
           {{deskOrder.totalPrice}}
         </el-form-item>
       </el-form>
       <el-button type="warning" style="position: absolute;left: 15%;" size="small" @click="dialogOrderList=false;submitDeskOrder(deskOrder)">确认提交</el-button>
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       <el-button type="warning"  size="small" @click="cancelDeskOrder()">取消订单</el-button>
     </el-dialog>
     <el-dialog
         :visible.sync="successIf"
         width="500px">
       请设置桌号
     </el-dialog>

     <el-dialog
         :visible.sync="successif"
         width="500px">
       下单成功
     </el-dialog>
   </div>
</template>

<script>
         import WaiterHeader from "@/components/WaiterHeader";
         import api from "@/util/api";

         export default {
           name: "WaiterOrder",
           components: {WaiterHeader},
           data() {
             return {

               // fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
               //订单详细弹窗
               dialogOrderList:false,
               //提交订单反馈弹窗
               successIf:false,
               //提交订单成功提示
               successif:false,
               //存储提交订单情况-是否成功
               message:"",
               dishesNumber:'',
               deskOrder:{
                 deskId:'',
                 dishOrders:[],
                 totalPrice:0.0
               },
               dishes:[],
             }

           },
           mounted() {
             let path = api.path + "/dish/dish/showDish"
             this.axios.get(path).then((response) => {
               this.dishes = response.data.data

             })
           },
           methods: {
             handleChange(num, dish) {
               var isOk = '0'
               //存储临时数据的对应变量
               var totalPrice = 0
               var dishesNumber = 0
               if (this.deskOrder.dishOrders.length === 0) {
                 this.deskOrder.dishOrders = this.deskOrder.dishOrders.concat({
                   dishId: dish.dishId,
                   dishPrice: dish.dishPrice,
                   dishName: dish.dishName,
                   dishNum: num
                 })
               } else {
                 for (let i = 0; i < this.deskOrder.dishOrders.length; i++) {
                   if (this.deskOrder.dishOrders[i].dishId === dish.dishId) {
                     this.deskOrder.dishOrders[i].dishNum = num
                     isOk = '1'
                   }
                 }
                 if (isOk === '0') {
                   this.deskOrder.dishOrders = this.deskOrder.dishOrders.concat({
                     dishId: dish.dishId,
                     dishPrice: dish.dishPrice,
                     dishName: dish.dishName,
                     dishNum: num
                   })
                 }
               }
               for (let i = 0; i < this.deskOrder.dishOrders.length; i++) {
                 totalPrice = parseInt(totalPrice) + parseInt(this.deskOrder.dishOrders[i].dishNum) * parseInt(this.deskOrder.dishOrders[i].dishPrice)
                 dishesNumber = parseInt(dishesNumber) + parseInt(this.deskOrder.dishOrders[i].dishNum)
               }
               //将临时变量的数据传给全局变量
               this.deskOrder.totalPrice = totalPrice
               this.dishesNumber = dishesNumber
             },

             submitDeskOrder(deskOrder){
               if(deskOrder.deskId===''){
                 this.successIf = true
               }else{
                 console.log(deskOrder)
                 let path = api.path + "/order/orderlist/waiterOrder"
                 this.axios.post(path,deskOrder).then((response) => {
                   if(response.data.status==='200'){
                     console.log(response.data)
                     this.successif=true
                   }
                 })
                 //location.reload()
               }

             },
             cancelDeskOrder(){
               location.reload()
             }
           }
         }
         </script>

<style scoped>
.el-form-1{
  margin: 0 auto;
  width: 500px;
  color: #556B2F;
}
.el-input-table{
  width: 200px;
  margin: 0 auto;
}
.img-2{
  width: 130px;
  height: 80px;
}
.menu-tabs{
  position: absolute;
  bottom: 0;
  top:160px;
  left: 30px;
  right: 30px;
  height: 420px;
  overflow-y: auto;
}
.item-button{
  width: 100px;
  height: 40px;
  /*margin-top: 480px;*/
  /*购物车固定在底部*/
  position: fixed;
  bottom:10px;
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