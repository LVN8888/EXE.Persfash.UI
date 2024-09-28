import React from 'react';
import { YAxis as RechartsYAxis } from 'recharts';

// Tạo một HOC để truyền tham số mặc định
const YAxisCustom = ({ tickSize = 10, ...rest }) => {
  return <RechartsYAxis tickSize={tickSize} {...rest} />;
};

export default YAxisCustom;
