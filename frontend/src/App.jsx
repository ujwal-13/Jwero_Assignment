import React, { useState, useEffect } from 'react';
import * as api from './services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, Legend } from 'recharts';
import { DollarSign, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

const COLORS = ['#d4af37', '#c9a961', '#b8941f', '#f4e8c1', '#e8d5a3'];

function App() {
  const [dates, setDates] = useState({ start: '2026-01-01', end: '2026-01-31' });
  const [data, setData] = useState({
    revenue: { current: 0, previous: 0 },
    dailySales: [],
    categories: [],
    topProducts: []
  });

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [rev, sales, cats, prods] = await Promise.all([
          api.fetchRevenue(dates.start, dates.end),
          api.fetchDailySales(dates.start, dates.end),
          api.fetchCategories(),
          api.fetchTopProducts(dates.start, dates.end)
        ]);

        setData({
          revenue: rev.data,
          dailySales: sales.data,
          categories: cats.data,
          topProducts: prods.data
        });
      } catch (err) {
        console.error("Dashboard Load Error:", err);
      }
    };
    loadAllData();
  }, [dates]);

  const growth = data.revenue.previous > 0 
    ? ((data.revenue.current - data.revenue.previous) / data.revenue.previous * 100).toFixed(1) 
    : 0;

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Custom tooltip formatter
  const formatCurrency = (value) => {
    return `₹${parseFloat(value || 0).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div>
          <h1>Jwero Analytics</h1>
          <p>Jewelry Sales & Inventory Insights</p>
        </div>
        <div className="date-controls">
          <Calendar size={18} />
          <input type="date" value={dates.start} onChange={e => setDates({...dates, start: e.target.value})} />
          <span>to</span>
          <input type="date" value={dates.end} onChange={e => setDates({...dates, end: e.target.value})} />
        </div>
      </header>

      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon revenue"><DollarSign /></div>
          <div className="stat-content">
            <label>Total Revenue</label>
            <h3>₹{parseFloat(data.revenue.current || 0).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</h3>
            <span className={growth >= 0 ? 'trend-up' : 'trend-down'}>
              {growth >= 0 ? <TrendingUp size={14}/> : <TrendingDown size={14}/>} {growth} % increase
            </span>
          </div>
        </div>
      </div>

      <div className="main-charts-grid">
        {/* Daily Sales Trend */}
        <div className="chart-box">
          <h3>Daily Sales Summary</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.dailySales} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8e5e0" />
              <XAxis 
                dataKey="order_date" 
                tick={{fontSize: 11, fill: '#6b6b6b'}}
                tickFormatter={formatDate}
              />
              <YAxis 
                tick={{fontSize: 11, fill: '#6b6b6b'}}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value) => formatCurrency(value)}
                labelFormatter={(label) => `Date: ${formatDate(label)}`}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e8e5e0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#d4af37" 
                strokeWidth={3} 
                dot={{r: 5, fill: '#d4af37'}}
                activeDot={{r: 7}}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="chart-box">
          <h3>Revenue by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.categories} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8e5e0" />
              <XAxis 
                dataKey="category" 
                tick={{fontSize: 11, fill: '#6b6b6b'}}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tick={{fontSize: 11, fill: '#6b6b6b'}}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e8e5e0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                {data.categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="table-box">
        <h3>Top Selling Products (by Quantity)</h3>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity Sold</th>
            </tr>
          </thead>
          <tbody>
            {data.topProducts.map((product, idx) => (
              <tr key={idx}>
                <td>{product.product_name}</td>
                <td><strong>{product.total_qty}</strong> units</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;