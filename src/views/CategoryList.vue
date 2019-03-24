<template>
  <div class="xfn-category-list">
    <el-breadcrumb>
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜品类别管理</el-breadcrumb-item>
      <el-breadcrumb-item>类别列表</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-button type="primary" @click="addCategory">添加新的菜品类别</el-button>
    <br><br>
    <el-table :data="categoryList" stripe border>

      <el-table-column label="编号" prop="cid"></el-table-column>
    
      <el-table-column label="名称" prop="cname"></el-table-column>

      <el-table-column label="操作">
        <!-- table组件底层使用的v-for，但是我们拿不到循环的临时变量，slot-scope就指向它 -->
        <!-- row就是每一行的数据,$index它的下标 -->
        <template slot-scope="{row,$index}">
          <el-button @click="updateCategory(row,$index)" type="success" size="mini">修改</el-button>
          <el-button @click="deleteCategory(row,$index)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      categoryList:[]
    }
  },
  methods:{
    deleteCategory(c, i){
      this.$confirm('删除操作不可撤销！您确定吗？', '提示', {type:'warning'}).then(()=>{
        var url = this.$store.state.globalSettings.apiUrl + '/admin/category/'+c.cid;
        this.$axios.delete(url).then((res)=>{
          if(res.data.code==200){//数据库中已经删除成功
            this.categoryList.splice(i, 1);//模型数据中删除
            this.$message.success('菜品类别删除成功！');
          }else {
            this.$message.error('类别删除出差错：'+res.data.msg);
          }
        }).catch((err)=>{
          //this.$confirm返回是一个promise，点击取消执行这个回调函数
          console.log(err);
        })
      }).catch(()=>{

      })
    },
    updateCategory(c, i){    //c就是遍历出来的每一个类别对象
      this.$prompt('请输入您想修改的类别名：','提示',{
        inputValue: c.cname     //输入框的初始文本
      }).then(({value})=>{     //$prompt返回出修改后的输入框新值cname,value
         var url = this.$store.state.globalSettings.apiUrl+"/admin/category"
         this.$axios.put(url,{cid:c.cid,cname:value}).then((res)=>{
           if(res.data.code==200){
             this.$message.success('修改菜品类型成功!')
             c.cname = value    //修改当前类别的cname
           }else if(res.data.code==400){
             this.$message.err('修改菜品类型失败:'+res.data.msg)
           }else if(res.data.code==401){
             this.$message.warning('您对当前菜品类型未作修改')
           }
         })
      }).catch(()=>{
        //用户选择了取消
      })
    },
    addCategory(){
      //$prompt，返回的实际上是result={value:'蔬菜5',..}  value是result解构出来的value
      this.$prompt('请输入新的菜品类别名：','提示',{type:'info'}).then(({value})=>{
        //获得用户的输入，调用数据API添加到数据库
        var url = this.$store.state.globalSettings.apiUrl + '/admin/category';
        this.$axios.post(url, {cname:value}).then((res)=>{
          if(res.data.code==200){
            console.log(res)
            //数据库中添加成功
            this.$message.success('新的类别添加成功!')   
            //模型数据中添加新的类别
            this.categoryList.push({cid:res.data.cid, cname:value})
          }else {
            this.$message.error('新的类别添加出错：'+res.data.msg);
          }
        }).catch((err)=>{
          console.log(err);
        })
      }).catch(()=>{
      })
    }
  },
  mounted(){
    var url = this.$store.state.globalSettings.apiUrl + '/admin/category';
    this.$axios.get(url).then((res)=>{
      this.categoryList = res.data;
    }).catch((err)=>{
      console.log(err);
    })
  }
}
</script> 
