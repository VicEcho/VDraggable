# VDraggable
基于H5实现的react拖拽排序组件

# API

| 参数   |   说明      |  类型 |　默认值|
|----------|:-------------:|------:|------:|
| value |  数据数组 | array|    []   |
| onChange | 释放拖拽时触发   |   function(item) |  －   |
| style| 样式 | object |    －   |
| render| 生成复杂数据的渲染函数，参数为当前行数据 |   function(item) |   －    |
| isAcceptAdd| 是否接受拖拽复制 |    boolean |   false    |
| sortKey| 设置根据排序的字段 |    string |  －     |
| codeKey| 制定item中某个字段作为拖拽元素的key，必须唯一| string |  －  |
