import './styles.css';

if (process.env.NODE_ENV !== 'production') console.log("this is dev mode")
else console.log("this is prod mode");

async function getComponent() {
  var element = document.createElement('div');
  const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');

  element.innerHTML = _.join(['Hello', 'Webpack'], ' ');

  return element;
}

getComponent().then(component => {
  document.body.appendChild(component);
})