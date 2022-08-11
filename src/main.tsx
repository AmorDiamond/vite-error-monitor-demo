import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import './index.css'
// Sentry监控工具
Sentry.init({
  dsn: "https://feb44a87691d4286b7c580004c7bb2b2@o1355681.ingest.sentry.io/6640345",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0, // 若要减少捕获的性能数据量，请将 tracesSampleRate 更改为0到1之间的值
});

// JS 错误监控里面有个 window.onEerror，
// 又用了 window.addEventLisenter（'error'），
// 其实两者并不能互相代替。
// window.onError 是一个标准的错误捕获接口，它可以拿到对应的这种 JS 错误；
// window.addEventLisenter（'error'）也可以捕获到错误，
// 但是它拿到的 JS 报错堆栈往往是不完整的。
// 同时 window.onError 无法获取到资源加载失败的一个情况，
// 必须使用 window.addEventLisenter（'error'）来捕获资源加载失败的情况。

// 同步和异步产生的异常，以及throw错误和组件内部渲染数据错误（如果使用了ErrorBoundary错误边界方案包裹的子组件渲染出错在生产环境不会触发）
window.onerror = function(message, source, lineno, colno, error) {
  // 若该函数返回true，则阻止执行默认事件处理函数，如异常信息不会在console中打印。没有返回值或者返回值为false的时候，异常信息会在console中打印
  console.log('onerror', message, source, lineno, colno, error);
};
// 网络加载错误是不会进行事件冒泡的，而 window.onerror 事件是通过事件冒泡获取 error 信息的，所以需要通过addEventListener error处理
// 实现监听网络异常的错误（比如图片加载出错），必须在捕获阶段处理，冒泡阶段无法监听到资源加载错误，感觉比onerror更全，但是不能阻止默认事件处理函数的执行，测试发现包含了同步、异步、网络异常、throw错误和组件内部渲染数据错误（如果使用了ErrorBoundary错误边界方案包裹的子组件渲染出错在生产环境不会触发）
window.addEventListener('error', args => {
  console.log( 'error event:', args );
  return true; // 似乎无任何作用
}, true);
// 实现监听promise的异常
window.addEventListener("unhandledrejection", e => {console.log('unhandledrejection',e)});
// 监听promise的异常，然后抛给error，统一在error里执行统计
// window.addEventListener("unhandledrejection", e => {throw e.reason});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
)
