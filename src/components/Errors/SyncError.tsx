import React, { useRef } from 'react'

type Props = {}

export default function SyncError({}: Props) {
    const 同步错误Ref = useRef<any>({})
    const on同步错误 = () => {
        同步错误Ref.current.test();
    }
  return (
    <div><button onClick={on同步错误}>SyncError</button></div>
  )
}