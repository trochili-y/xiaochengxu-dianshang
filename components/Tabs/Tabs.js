Component({

  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击事件
    handleItemTap(e){
      const {index}=e.currentTarget.dataset;
      // console.log(e)
      // 触发父组件中的事件
      this.triggerEvent("tabsItemChange",{index})

    }

  }
})
