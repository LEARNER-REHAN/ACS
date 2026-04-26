import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import "../styles/ProgressPage.css";

function ProgressPage() {
  const history = JSON.parse(localStorage.getItem("history")) || [];

  const overallProgress = Number(localStorage.getItem("overallProgress")) || 0;

  const streak = Number(localStorage.getItem("streak")) || 0;

  const improvement = Number(localStorage.getItem("improvement")) || 0;

  const riskLevel = localStorage.getItem("riskLevel") || "Low";

  const progressData = history.map((item, index) => ({
    day: `Day ${index + 1}`,
    progress: item.progress,
  }));

  const categoryCount = {};

  history.forEach((item) => {
    categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
  });

  const pieData = Object.keys(categoryCount).map((key) => ({
    name: key,
    value: categoryCount[key],
  }));

  const COLORS = ["#3366ff", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC"];

  return (
    <div className="progress-page">
      <h1>📈 Recovery Progress Dashboard</h1>

      <div className="progress-top-cards">
        <div className="progress-card">
          <h3>Current Streak</h3>
          <h2>{streak} Days</h2>
        </div>

        <div className="progress-card">
          <h3>Overall Progress</h3>
          <h2>{overallProgress}%</h2>
        </div>

        <div className="progress-card">
          <h3>Weekly Improvement</h3>
          <h2>{improvement}%</h2>
        </div>

        <div className="progress-card">
          <h3>Risk Level</h3>
          <h2>{riskLevel}</h2>
        </div>
      </div>

      {/* Line Chart */}
      <div className="chart-box">
        <h2>Recovery Trend</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="progress"
              stroke="#3366ff"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="chart-box">
        <h2>Category Distribution</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={100} label>
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="chart-box">
        <h2>Usage Comparison</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="usage" fill="#3366ff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ProgressPage;
