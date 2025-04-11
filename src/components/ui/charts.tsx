
import React from "react";
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartProps {
  data: any[];
  height?: number;
  width?: number;
  className?: string;
}

interface LineChartProps extends ChartProps {
  categories: string[];
  index: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  yAxisWidth?: number;
}

interface BarChartProps extends ChartProps {
  categories: string[];
  index: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  yAxisWidth?: number;
}

interface AreaChartProps extends ChartProps {
  categories: string[];
  index: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  yAxisWidth?: number;
}

interface PieChartProps extends ChartProps {
  category: string;
  index: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
}

export const LineChart = ({
  data,
  categories,
  index,
  colors = ["#2563eb", "#16a34a", "#ef4444", "#f59e0b"],
  valueFormatter = (value: number) => `${value}`,
  yAxisWidth = 40,
  className,
  height = 400,
  width,
}: LineChartProps) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={index}
            tick={{ fill: "#888888" }}
            tickLine={{ stroke: "#888888" }}
            axisLine={{ stroke: "#888888" }}
          />
          <YAxis
            width={yAxisWidth}
            tick={{ fill: "#888888" }}
            tickLine={{ stroke: "#888888" }}
            axisLine={{ stroke: "#888888" }}
            domain={["auto", "auto"]}
            tickFormatter={valueFormatter}
          />
          <Tooltip
            formatter={valueFormatter}
            labelFormatter={(value) => `${value}`}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.375rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          />
          <Legend />
          {categories.map((category, index) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[index % colors.length]}
              activeDot={{ r: 8 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const BarChart = ({
  data,
  categories,
  index,
  colors = ["#2563eb", "#16a34a", "#ef4444", "#f59e0b"],
  valueFormatter = (value: number) => `${value}`,
  yAxisWidth = 40,
  className,
  height = 400,
  width,
}: BarChartProps) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={index}
            tick={{ fill: "#888888" }}
            tickLine={{ stroke: "#888888" }}
            axisLine={{ stroke: "#888888" }}
          />
          <YAxis
            width={yAxisWidth}
            tick={{ fill: "#888888" }}
            tickLine={{ stroke: "#888888" }}
            axisLine={{ stroke: "#888888" }}
            domain={["auto", "auto"]}
            tickFormatter={valueFormatter}
          />
          <Tooltip
            formatter={valueFormatter}
            labelFormatter={(value) => `${value}`}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.375rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          />
          <Legend />
          {categories.map((category, index) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors[index % colors.length]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const AreaChart = ({
  data,
  categories,
  index,
  colors = ["#2563eb", "#16a34a", "#ef4444", "#f59e0b"],
  valueFormatter = (value: number) => `${value}`,
  yAxisWidth = 40,
  className,
  height = 400,
  width,
}: AreaChartProps) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={index}
            tick={{ fill: "#888888" }}
            tickLine={{ stroke: "#888888" }}
            axisLine={{ stroke: "#888888" }}
          />
          <YAxis
            width={yAxisWidth}
            tick={{ fill: "#888888" }}
            tickLine={{ stroke: "#888888" }}
            axisLine={{ stroke: "#888888" }}
            domain={["auto", "auto"]}
            tickFormatter={valueFormatter}
          />
          <Tooltip
            formatter={valueFormatter}
            labelFormatter={(value) => `${value}`}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.375rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          />
          <Legend />
          {categories.map((category, index) => (
            <Area
              key={category}
              type="monotone"
              dataKey={category}
              fill={colors[index % colors.length]}
              stroke={colors[index % colors.length]}
              fillOpacity={0.3}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const PieChart = ({
  data,
  category,
  index,
  colors = ["#2563eb", "#16a34a", "#ef4444", "#f59e0b", "#a855f7", "#ec4899", "#14b8a6", "#64748b"],
  valueFormatter = (value: number) => `${value}`,
  className,
  height = 400,
  width,
}: PieChartProps) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            nameKey={index}
            dataKey={category}
            cx="50%"
            cy="50%"
            outerRadius={130}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={valueFormatter}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.375rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};
