// 不同属性别名处理
function registerNormalWatchers() {
  const props = ['label', 'property', 'filters', 'filterMultiple', 'sortable', 'index', 'formatter', 'className', 'labelClassName', 'showOverflowTooltip']
  // 一些属性具有别名
  const aliases = {
    prop: 'property',
    realAlign: 'align',
    realHeaderAlign: 'headerAlign',
    realWidth: 'width',
  }

  const all = props.reduce((pre, cur) => {
    pre[cur] = cur
    return pre
  }, aliases)
  const allAliases = props.reduce((prev, cur) => {
    prev[cur] = cur
    return prev
  }, aliases)
  console.log(aliases)
  console.log('----')
  console.log(allAliases)
  Object.keys(allAliases).forEach((key) => {
    const columnKey = aliases[key]

    // this.$watch(key, (newVal) => {
    //   this.columnConfig[columnKey] = newVal;
    // });
  })
}

registerNormalWatchers()
