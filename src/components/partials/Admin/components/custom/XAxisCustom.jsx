import React from 'react';
import { XAxis as RechartsXAxis } from 'recharts';

// Tạo một HOC để sử dụng tham số mặc định thay vì defaultProps
const XAxisCustom = ({ tickSize = 10, ...rest }) => {
  return <RechartsXAxis tickSize={tickSize} {...rest} />;
};

export default XAxisCustom;
