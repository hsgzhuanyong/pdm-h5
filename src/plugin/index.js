import Layer from './Layer';
import Storage from './Storage';

const plugins = [
  Layer,
  Storage
];

export default Vue => {
  plugins.forEach(item => {
    item(Vue);
  });
};
