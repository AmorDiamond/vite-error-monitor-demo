import { Button, Card } from 'antd'
import React from 'react'

type Props = {}

export default function User({}: Props) {
  return (
    <Card title="user">User<Button>按钮</Button></Card>
  )
}