import React from 'react'

type Props = {
    title: string;
}

export default function Title({title}: Props) {
  return (
    <div>{title}</div>
  )
}