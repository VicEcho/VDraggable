# VDraggable
基于H5实现的react拖拽排序组件

# API

参数                  &nbsp;&nbsp;&nbsp;&nbsp;说明                                   &nbsp;&nbsp;&nbsp;&nbsp;类型                        &nbsp;&nbsp;默认值

---
value                 &nbsp;&nbsp;&nbsp;&nbsp;数据数组                                 &nbsp;&nbsp;&nbsp;array                         &nbsp;&nbsp;[]

---
onChange              &nbsp;&nbsp;&nbsp;&nbsp;释放拖拽时触发                            &nbsp;&nbsp;&nbsp;function(value)                &nbsp;&nbsp;-

---
style                 &nbsp;&nbsp;&nbsp;&nbsp;样式                                    &nbsp;&nbsp;&nbsp;object                         &nbsp;&nbsp;-

---
render                &nbsp;&nbsp;&nbsp;&nbsp;生成复杂数据的渲染函数，参数为当前行数据      &nbsp;&nbsp;&nbsp;function(item)                 &nbsp;&nbsp;-    

---
isAcceptAdd           &nbsp;&nbsp;&nbsp;&nbsp;是否接受拖拽复制                          &nbsp;&nbsp;&nbsp;boolean                       &nbsp;&nbsp;false    

---
sortKey               &nbsp;&nbsp;&nbsp;&nbsp;设置根据排序的字段                         &nbsp;&nbsp;&nbsp;string                         &nbsp;&nbsp;-    

---