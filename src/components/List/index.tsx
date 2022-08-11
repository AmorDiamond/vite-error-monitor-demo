import React, { useRef, useState } from "react";

type Props = {};

export default function List({}: Props) {
  const [list, setList] = useState<any>([1, 2, 3]);
  const objRef = useRef<any>({});
  return (
    <div>
      <button onClick={() => {
        objRef.current.test();
      }}>Error function</button>
      <button onClick={() => setList({})}>Error list组件内渲染逻辑错误</button>
      {list.map((item: any) => {
        return <p key={item}>{item}</p>;
      })}
    </div>
  );
}
