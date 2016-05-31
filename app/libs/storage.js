/**
 * @desc 本地存储的封装
 * 这里仅仅简单实用localStorage, 其实可以更深入的实现一下。
 * storage => {...}, 实用工厂类获取具体的存储方式类
 * 或者使用localforage,避免复杂的实现
 */
export default {
    get(k) {
        try {
            return JSON.parse(localStorage.getItem(k));
        } catch (e) {
            return null;
        }
    },
    set(k, v) {
        localStorage.setItem(k, JSON.stringify(v));
    }
}
