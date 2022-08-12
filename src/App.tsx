import React, { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import List from './components/List'
import Title from './components/title'
import AsyncError from './components/Errors/AsyncError'
import PromiseError from './components/Errors/PromiseError'
import SyncError from './components/Errors/SyncError'
import { Divider } from 'antd'
import AppRoutes from './routes'
// 错误边界组件

// 错误边界只能使用class方式创建组件

type FallbackRender = (props:{error:Error | null}) => React.ReactElement

class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender:FallbackRender}>,{error:Error | null}> {
    state ={error:null}

    // 当子组件抛出异常，这里会接收到error并修改state中的error
    static getDerivedStateFromError(error:Error){
        return {error}
    }

    componentDidCatch(error: any, errorInfo: any) {
      console.log('ErrorBoundary componentDidCatch 使用了错误边界方案，生产环境不会继续向上层触发error事件', error, errorInfo);
    }

    render(){
        const {error} = this.state
        const {children,fallbackRender} = this.props
        if(error){
            return fallbackRender({error})
        }
        return children
    }
}



function App() {
  const [count, setCount] = useState(0)
  const [list, setList] = useState<any>([1,2,3])
  const objRef = useRef<any>({test: () => {
    console.log('test');
  }})
  const onErrorTest = () => {
    objRef.current.test();
  }

  return (
    <div className="App">
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1> */}
      <div className="card">
        <button onClick={() => {
          objRef.current = {};
          setCount((count) => count + 1)
          }}>
          count is {count}
        </button>
        <button onClick={() => setList({})}>Error list</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div onClick={onErrorTest}>Error test</div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ErrorBoundary fallbackRender={() => <p>error</p>}>
        <Title title="正常的组件" />
        <Divider />
        <List />
        <AsyncError />
        <SyncError />
        <PromiseError />
      </ErrorBoundary>
        <AppRoutes />
    </div>
  )
}

export default App
