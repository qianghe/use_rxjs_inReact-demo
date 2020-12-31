/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import { Row, Col, Space, Button } from 'antd'
import RouterView from './RouterView'
import './index.scss'
import { useLocation } from 'react-router-dom'

const HomePage = () => {
  const { pathname = '' } = useLocation()
  
  const getBtnType = (href) => href === pathname ? 'primary' : 'default'
  
  return (
    <div className="home-page">
      {/* menu */}
      <div className="guide">
        <Row gutter={20} align="middle">
          <Col span={3}><p>Operators Demo:</p></Col>
          <Col>
            <Space>
              <Button type={getBtnType('/operator/1')} href="/operator/1">Demo 1</Button>
              <Button type={getBtnType('/operator/2')} href="/operator/2">Demo 2</Button>
            </Space>
          </Col>
        </Row>
        <Row gutter={20} align="middle">
          <Col span={3}><p>Subject Demo:</p></Col>
          <Col>
            <Space>
              <Button type={getBtnType('/subject/1')} href="/subject/1">Demo 1</Button>
              <Button type={getBtnType('/subject/2')} href="/subject/2">Demo 2</Button>
            </Space>
          </Col>
        </Row>
        <Row gutter={20} align="middle">
          <Col span={3}><p>Event Demo:</p></Col>
          <Col>
            <Space>
              <Button type={getBtnType('/event/1')} href="/event/1">Demo 1</Button>
              <Button type={getBtnType('/event/2')} href="/event/2">Demo 2</Button>
            </Space>
          </Col>
        </Row>
        <Row gutter={20} align="middle">
          <Col span={3}><p>Example:</p></Col>
          <Col>
            <Space>
              <Button type={getBtnType('/example/1')} href="/example/1">Demo 1</Button>
            </Space>
          </Col>
        </Row>
      </div>
      {/* route switch */}
      <RouterView />
    </div>
  )
}
export default HomePage
