import React, { useState, useEffect } from "react";
import { Card, Statistic, DatePicker, Row, Col } from "antd";
import moment from "moment";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  getDashboardData,
  getDashboardDataByDate,
} from "../../../../services/Admin/DashboardAPI";
import XAxisCustom from "./custom/XAxisCustom"; // Import XAxisCustom
import YAxisCustom from "./custom/YAxisCustom"; // Import YAxisCustom

const { RangePicker } = DatePicker;

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [totalSubscriptions, setTotalSubscriptions] = useState(0);
  const [revenue, setRevenue] = useState({ day: 0, week: 0, month: 0 });
  const [revenueInRange, setRevenueInRange] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [dateRange, setDateRange] = useState([
    moment().startOf("week"),
    moment().endOf("week"),
  ]);

  // Function to load general dashboard data
  const loadDashboardData = async () => {
    try {
      const response = await getDashboardData();
      setUserCount(response.totalUser || 0);
      setTotalSubscriptions(response.totalPremiumSubscription || 0);
      setRevenue({
        day: response.revenueToday || 0,
        week: response.revenueThisWeek || 0,
        month: response.revenueThisMonth || 0,
      });
    } catch (error) {
      console.error("Error loading dashboard data", error);
    }
  };

  // Function to load data for the selected date range
  const loadDashboardDataByDate = async (startDate, endDate) => {
    try {
      const formattedStartDate = startDate.format("YYYY-MM-DD");
      const formattedEndDate = endDate.format("YYYY-MM-DD");

      const response = await getDashboardDataByDate(
        formattedStartDate,
        formattedEndDate
      );
      setRevenueInRange(response.totalRevenueDateRange || 0);

      const chartDataFromApi = response.revenueDateRange || {};
      const formattedChartData = Object.keys(chartDataFromApi).map((date) => ({
        day: date,
        revenue: chartDataFromApi[date],
      }));
      setChartData(formattedChartData);
    } catch (error) {
      console.error("Error loading data by date", error);
    }
  };

  useEffect(() => {
    loadDashboardData(); // Load dashboard data when the component is mounted
  }, []);

  const handleDateRangeChange = async (dates) => {
    setDateRange(dates);
    const [startDate, endDate] = dates;

    await loadDashboardDataByDate(startDate, endDate);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <div className="p-4">
      {/* Dashboard Title */}
      <h2 className="text-3xl font-extrabold text-gray-700 mb-8">Dashboard</h2>

      {/* Total Users and Total Subscriptions */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12}>
          <Card
            className="shadow-md rounded-lg border border-gray-200"
            style={{ background: "#f9fafb", padding: "20px" }}
          >
            <Statistic
              title={<span className="text-lg font-semibold">Total Users</span>}
              value={userCount}
              valueStyle={{ color: "#1890ff", fontSize: "2rem" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card
            className="shadow-md rounded-lg border border-gray-200"
            style={{ background: "#f0f5ff", padding: "20px" }}
          >
            <Statistic
              title={<span className="text-lg font-semibold">Total Subscriptions</span>}
              value={totalSubscriptions}
              valueStyle={{ color: "#1890ff", fontSize: "2rem" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Revenue Section */}
      <Row gutter={[24, 24]} className="mt-6">
        <Col xs={24} sm={8}>
          <Card
            className="shadow-md rounded-lg border border-gray-200"
            style={{ background: "#fff5f5", padding: "20px" }}
          >
            <Statistic
              title={<span className="text-lg font-semibold">Revenue Today</span>}
              value={formatCurrency(revenue.day)}
              valueStyle={{ color: "#ff4d4f", fontSize: "2rem" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            className="shadow-md rounded-lg border border-gray-200"
            style={{ background: "#f6ffed", padding: "20px" }}
          >
            <Statistic
              title={<span className="text-lg font-semibold">Revenue This Week</span>}
              value={formatCurrency(revenue.week)}
              valueStyle={{ color: "#52c41a", fontSize: "2rem" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            className="shadow-md rounded-lg border border-gray-200"
            style={{ background: "#fff5f5", padding: "20px" }}
          >
            <Statistic
              title={<span className="text-lg font-semibold">Revenue This Month</span>}
              value={formatCurrency(revenue.month)}
              valueStyle={{ color: "#faad14", fontSize: "2rem" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Revenue in Date Range */}
      <Row gutter={[24, 24]} className="mt-6">
        <Col xs={24}>
          <Card
            className="shadow-md rounded-lg border border-gray-200"
            style={{ padding: "20px" }}
          >
            <Statistic
              title={<span className="text-lg font-semibold">Revenue in Date Range</span>}
              value={formatCurrency(revenueInRange)}
              valueStyle={{ color: "#fa541c", fontSize: "2rem" }}
            />
            <RangePicker
              className="mt-2 w-full"
              value={dateRange}
              onChange={handleDateRangeChange}
              format="YYYY-MM-DD"
              style={{ width: "100%" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Chart Section */}
      <Row className="mt-10">
        <Col xs={24}>
          <Card
            title="Revenue Over the Selected Date Range"
            className="shadow-lg rounded-lg border border-gray-200"
            style={{ background: "#fafafa", padding: "20px" }}
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxisCustom dataKey="day" /> {/* Custom XAxis */}
                <YAxisCustom /> {/* Custom YAxis */}
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
