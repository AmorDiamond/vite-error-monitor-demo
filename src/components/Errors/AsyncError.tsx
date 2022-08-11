import React, { useEffect, useRef } from "react";

type Props = {};
// 异步出错
export default function AsyncError({}: Props) {
  const objRef = useRef<any>({});
  const testErrorAsync = () => {
    setTimeout(() => {
      objRef.current.test();
    }, 1000);
  };
  useEffect(() => {
    // testErrorAsync()
  }, []);
  return (
    <div>
    <div>
      图片网络异常出错
      <img src="./xxxxx.png" />
    </div>
      <button onClick={testErrorAsync}>AsyncError</button>
    </div>
  );
}
