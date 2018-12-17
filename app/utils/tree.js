const utils = require('./index');

const filterArray = (list, level, pid) => {
  const arr = list.filter(ret => ret.level === level && ret.pid === pid);
  arr.sort((a, b) => a.order - b.order);
  return arr
};

exports.treeSortCreat = list => {
  if (!utils.isArray(list)) return;
  // 取出第一级
  const array1 = filterArray(list, 1, 0);

  // 拼接结果
  return array1.map(ret => {
    // 取出第二级
    const array2 = filterArray(list, ret.level + 1, ret.id);
    // 取出第三级
    ret.children = array2.map(meta => {
      meta.children = filterArray(list, meta.level + 1, meta.id);
      return meta
    });
    return ret
  })
};
