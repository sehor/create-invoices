// 现在可以通过 window.AppModule 访问 cjs/app/index.js 的导出
const appModule = window.AppModule;

const root = ReactDOM.createRoot(document.getElementById('navigation'));

function NavigationBar() {
  // 可以使用 appModule 中的功能
  return React.createElement('div', { className: 'nav-bar' },
    React.createElement('h1', null, 'Hello from React!'),
    React.createElement('ul', null,
      React.createElement('li', null, '首页'),
      React.createElement('li', null, '关于')
    )
  );
}

root.render(React.createElement(NavigationBar));