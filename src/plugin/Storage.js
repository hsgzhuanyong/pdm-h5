const Storage = {};

/**
 * 作用：获取storage
 * @param name  需要获取的key
 * @returns {any}  返回请求的值
 */
Storage.get = function (name) {
  return JSON.parse(localStorage.getItem(name));
};

/**
 * 作用：设置storage
 * @param name  需要设置的key
 * @param val   需要设置的值
 */
Storage.set = function (name, val) {
  localStorage.setItem(name, JSON.stringify(val));
};

/**
 * 作用：增加storage
 * @param name  需要往哪个项新增
 * @param addVal  需要新增的数组对象
 */
Storage.put = function (name, addKey, addVal) {
  if (!Storage.get(name)) {
    Storage.set(name, { [addKey]: addVal });
    return;
  }

  const newVal = Storage.get(name);
  newVal[addKey] = addVal;
  Storage.set(name, newVal);
};

/**
 * 作用：删除storage项
 * @param name  需要删除的Key
 */
Storage.remove = function (name) {
  localStorage.removeItem(name);
};

/**
 * 作用：移除所有
 */
Storage.clear = function () {
  localStorage.clear();
};

export default Vue => {
  Vue.prototype.$storage = Storage;
};
