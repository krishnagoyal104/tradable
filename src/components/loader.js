import React from 'react';
import { Spin, Space } from 'antd';

const Loader = (props) => {
  return(
    <Space size="middle">
      <Spin size="large" />
    </Space>
  );
}

export default Loader;