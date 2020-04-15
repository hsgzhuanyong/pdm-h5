
/**
 * 获取两个时间之间的时间差
 * @param { Date } startTime 开始时间
 * @param { Date } endTime   结束时间
 * @return { Object } 返回计算之后的，天，时，分，秒
 */
export function getTimeInterval (startTime, endTime) {
  // 时间差的毫秒数
  const ms = new Date(endTime).getTime() - new Date(startTime).getTime();

  // 得到时间差的天数
  const d = Math.floor(ms / (24 * 3600 * 1000));

  // 计算天数后剩余的毫秒数
  const hours = ms % (24 * 3600 * 1000);

  // 得到时间差的小时
  const h = Math.floor(hours / (3600 * 1000));

  // 计算小时数后剩余的毫秒数
  const minutes = hours % (3600 * 1000);

  // 得到时间差的分钟
  const m = Math.floor(minutes / (60 * 1000));

  // 计算分钟数后剩余的毫秒数
  const seconds = minutes % (60 * 1000);

  // 得到时间差的秒
  const s = Math.round(seconds / 1000);

  return {
    d,
    h,
    m,
    s
  };
}

/**
 * 将第二个对象的属性值赋值给第一个对象的属性值，合并成一个新对象返回
 * @param obj1    原对象
 * @param obj2    新对象
 * @returns { Object }  合并成一个新对象返回
 */
export const assignExist = (obj1, obj2) => {
  const newObj = deepCopy(obj1);
  for (const key in obj2) {
    if (newObj[key] === undefined) {
      continue;
    }
    newObj[key] = obj2[key];
  }
  return newObj;
};

/**
 * 深度拷贝
 * @param obj
 * @returns {any}
 */
export function deepCopy (obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 简单的手机号验证
 * @param {Object} v
 */
export function verifyPhone (v) {
  // 验证手机号是否为1开头
  // 第二位在1-9之间
  // 11位数
  const reg = new RegExp(/^(1[1-9]\d{9}$)/);
  return reg.test(v);
}

/**
 * 判断是否为空
 * @param {Object} v
 */
export function isEmpty (v) {
  switch (typeof v) {
    case 'undefined':
      return true;
    case 'string':
      if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0) return true;
      break;
    case 'boolean':
      if (!v) return true;
      break;
    case 'number':

      // if (0 === v || isNaN(v)) return true;
      if (isNaN(v)) return true;
      break;
    case 'object':
      if (v === null || v.length === 0) return true;
      for (var i in v) {
        return false;
      }
      return true;
  }
  return false;
}

/**
  * 防抖
  * fn [function] 需要防抖的函数
  * delay [number] 毫秒，防抖期限值
  */
export function debounce (fn, delay) {
  let timer = null; // 借助闭包
  return function () {
    if (timer) {
      clearTimeout(timer); // 进入该分支语句，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
    }

    timer = setTimeout(fn, delay); // 进入该分支说明当前并没有在计时，那么就开始一个计时
  };
}

/**
  * 节流
  * fn [function] 需要节流的函数
  * delay [number] 毫秒，节流期限值
  */
export function throttle (fn, delay) {
  let valid = true;
  return function () {
    if (!valid) {
      // 休息时间 暂不接客
      return false;
    }

    // 工作时间，执行函数并且在间隔期内把状态位设为无效
    valid = false;
    setTimeout(() => {
      fn();
      valid = true;
    }, delay);
  };
}

/**
 * 简单的手机号验证
 * @param {Object} v
 */
export function verifyMobile (v) {
  // 验证手机号是否为1开头
  // 第二位在1-9之间
  // 11位数
  const reg = new RegExp(/^(1[1-9]\d{9}$)/);
  return reg.test(v);
}
