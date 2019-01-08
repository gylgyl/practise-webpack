import '../css/style.css';
import '../css/style.less';
import '../lodash'

console.log('gin index');
const TNAME = 'GYL'
console.log('TNAME:',TNAME);


if (module.hot) {
  // 实现热更新
  module.hot.accept();
  console.log('index hot');
}