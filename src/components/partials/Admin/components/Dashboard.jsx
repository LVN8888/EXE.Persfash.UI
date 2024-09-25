import React, { useState } from "react";
import { Card, Statistic, DatePicker, Row, Col } from "antd";
import moment from "moment";
import {
  AiOutlineUser,
  AiOutlineDollarCircle,
  AiOutlineCalendar,
  AiOutlineBarChart,
} from "react-icons/ai"; // Importing icons
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"; // Import recharts components
import YAxisCustom from "./custom/YAxisCustom";
import XAxisCustom from "./custom/XAxisCustom"; // Import XAxisCustom
const { RangePicker } = DatePicker;

const Dashboard = () => {
  // Fake data for users, subscriptions, and revenue in VNĐ
  const fakeUserCount = 1250;
  const fakeTotalSubscriptions = 320; // Fake number of total subscriptions
  const fakeRevenue = {
    day: 500000, // 500,000 VNĐ for today
    week: 3500000, // 3,500,000 VNĐ for this week
    month: 15000000, // 15,000,000 VNĐ for this month
  };

  const [dateRange, setDateRange] = useState([
    moment().startOf("week"),
    moment().endOf("week"),
  ]);

  // Fake data for the total revenue in the selected date range
  const fakeRevenueInRange = 4500000; // 4,500,000 VNĐ in date range

  // Chart data: Fake data for the last 7 days of revenue
  const chartData = [
    { day: "2024-09-01", revenue: 300000 },
    { day: "2024-09-02", revenue: 400000 },
    { day: "2024-09-03", revenue: 350000 },
    { day: "2024-09-04", revenue: 500000 },
    { day: "2024-09-05", revenue: 450000 },
    { day: "2024-09-06", revenue: 380000 },
    { day: "2024-09-07", revenue: 600000 },
  ];

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    // You can update the fakeRevenueInRange here based on the date range in the future
  };

  // Function to format numbers into VNĐ
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <div className="p-4">
      {/* Dashboard Title */}
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* Statistics Section */}
      <Row gutter={16}>
        <Col span={6}>
          <Card
            className="shadow-lg rounded-lg border border-gray-200"
            style={{ minHeight: "200px" }}
          >
            <Statistic
              title={
                <span>
                  <AiOutlineUser className="inline-block text-lg mr-2" />
                  Total Users
                </span>
              }
              value={fakeUserCount}
              valueStyle={{ fontSize: "2rem", fontWeight: "bold" }} // Enlarged font size
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="shadow-lg rounded-lg border border-gray-200"
            style={{ minHeight: "200px" }}
          >
            <Statistic
              title={
                <span>
                  <AiOutlineDollarCircle className="inline-block text-lg mr-2" />
                  Revenue Today
                </span>
              }
              value={formatCurrency(fakeRevenue.day)}
              valueStyle={{
                fontSize: "2rem",
                color: "#3f8600",
                fontWeight: "bold",
              }} // Enhanced styling for currency
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="shadow-lg rounded-lg border border-gray-200"
            style={{ minHeight: "200px" }}
          >
            <Statistic
              title={
                <span>
                  <AiOutlineDollarCircle className="inline-block text-lg mr-2" />
                  Revenue This Week
                </span>
              }
              value={formatCurrency(fakeRevenue.week)}
              valueStyle={{
                fontSize: "2rem",
                color: "#3f8600",
                fontWeight: "bold",
              }} // Consistent styling for all revenue numbers
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="shadow-lg rounded-lg border border-gray-200"
            style={{ minHeight: "200px" }}
          >
            <Statistic
              title={
                <span>
                  <AiOutlineBarChart className="inline-block text-lg mr-2" />
                  Total Subscriptions
                </span>
              }
              value={fakeTotalSubscriptions}
              valueStyle={{ fontSize: "2rem", fontWeight: "bold" }} // Enlarged font size for subscriptions
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} className="mt-4">
        <Col span={8}>
          <Card
            className="shadow-lg rounded-lg border border-gray-200"
            style={{ minHeight: "200px" }}
          >
            <Statistic
              title={
                <span>
                  <AiOutlineDollarCircle className="inline-block text-lg mr-2" />
                  Revenue This Month
                </span>
              }
              value={formatCurrency(fakeRevenue.month)}
              valueStyle={{
                fontSize: "2rem",
                color: "#3f8600",
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
        <Col span={16}>
          <Card
            className="shadow-lg rounded-lg border border-gray-200"
            style={{ minHeight: "200px" }}
          >
            <Statistic
              title={
                <span>
                  <AiOutlineCalendar className="inline-block text-lg mr-2" />
                  Revenue in Date Range
                </span>
              }
              value={formatCurrency(fakeRevenueInRange)}
              valueStyle={{
                fontSize: "2rem",
                color: "#3f8600",
                fontWeight: "bold",
              }}
            />
            <RangePicker
              className="mt-2"
              value={dateRange}
              onChange={handleDateRangeChange}
              format="YYYY-MM-DD"
            />
          </Card>
        </Col>
      </Row>

      {/* Chart Section */}
      <Row className="mt-8">
        <Col span={24}>
          <Card
            title="Revenue Over the Last 7 Days"
            className="shadow-lg rounded-lg border border-gray-200"
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxisCustom dataKey="day" /> {/* Sử dụng XAxisCustom */}
                <YAxisCustom />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
