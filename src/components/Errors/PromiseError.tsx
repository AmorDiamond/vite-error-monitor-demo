import React, { useEffect, useRef } from 'react'

type Props = {}

export default function PromiseError({}: Props) {
    const promiseErrorRef = useRef<any>({})
    const testErrorPromise = () => {
        new Promise((resolve, reject) => {
            reject('promise reject 错误信息')
        })
    }
    const testErrorPromise2 = () => {
        new Promise((resolve, reject) => {
            promiseErrorRef.current.test();
        })
    }
    useEffect(() => {
        // testErrorPromise()
    }, [])
  return (
    <div>
        <button onClick={testErrorPromise} className="PromiseError">PromiseError</button>
        <button onClick={testErrorPromise2}>PromiseError promise内部代码出错</button>
        </div>
  )
}