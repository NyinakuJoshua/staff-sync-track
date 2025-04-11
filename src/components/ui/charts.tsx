
import * as React from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "./chart";

// LineChart component
interface LineChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
  showGridLines?: boolean;
  startEndOnly?: boolean;
  className?: string;
}

export function LineChart({
  data,
  index,
  categories,
  colors = ["#2563eb", "#f97316", "#8b5cf6", "#10b981"],
  valueFormatter = (value) => `${value}`,
  showLegend = true,
  showGridLines = true,
  startEndOnly = false,
  className,
}: LineChartProps) {
  const config = React.useMemo(() => {
    return categories.reduce((acc, category, i) => {
      acc[category] = {
        label: category,
        color: colors[i % colors.length],
      };
      return acc;
    }, {} as Record<string, { label: string; color: string }>);
  }, [categories, colors]);

  return (
    <ChartContainer config={config} className={className}>
      <ComposedChart data={data}>
        {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis
          dataKey={index}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            if (startEndOnly) {
              const isFirstOrLast = value === data[0][index] || value === data[data.length - 1][index];
              return isFirstOrLast ? value : "";
            }
            return value;
          }}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={valueFormatter} />
        <ChartTooltip
          content={
            <ChartTooltipContent 
              valueFormatter={valueFormatter} 
              indicator="line"
            />
          }
        />
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            dot={{ strokeWidth: 2, r: 2 }}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        ))}
        {showLegend && (
          <Legend
            content={<ChartLegendContent payload={categories.map((category, i) => ({ 
              value: category, 
              color: colors[i % colors.length] 
            }))} />}
          />
        )}
      </ComposedChart>
    </ChartContainer>
  );
}

// AreaChart component
interface AreaChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
  showGridLines?: boolean;
  startEndOnly?: boolean;
  className?: string;
}

export function AreaChart({
  data,
  index,
  categories,
  colors = ["#2563eb", "#f97316", "#8b5cf6", "#10b981"],
  valueFormatter = (value) => `${value}`,
  showLegend = true,
  showGridLines = true,
  startEndOnly = false,
  className,
}: AreaChartProps) {
  const config = React.useMemo(() => {
    return categories.reduce((acc, category, i) => {
      acc[category] = {
        label: category,
        color: colors[i % colors.length],
      };
      return acc;
    }, {} as Record<string, { label: string; color: string }>);
  }, [categories, colors]);

  return (
    <ChartContainer config={config} className={className}>
      <ComposedChart data={data}>
        {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis
          dataKey={index}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            if (startEndOnly) {
              const isFirstOrLast = value === data[0][index] || value === data[data.length - 1][index];
              return isFirstOrLast ? value : "";
            }
            return value;
          }}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={valueFormatter} />
        <ChartTooltip
          content={
            <ChartTooltipContent 
              valueFormatter={valueFormatter} 
              indicator="line"
            />
          }
        />
        {categories.map((category, i) => (
          <Area
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i % colors.length]}
            fill={colors[i % colors.length]}
            fillOpacity={0.2}
            strokeWidth={2}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        ))}
        {showLegend && (
          <Legend
            content={<ChartLegendContent payload={categories.map((category, i) => ({ 
              value: category, 
              color: colors[i % colors.length] 
            }))} />}
          />
        )}
      </ComposedChart>
    </ChartContainer>
  );
}

// BarChart component
interface BarChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
  layout?: "horizontal" | "vertical";
  className?: string;
}

export function BarChart({
  data,
  index,
  categories,
  colors = ["#2563eb", "#f97316", "#8b5cf6", "#10b981"],
  valueFormatter = (value) => `${value}`,
  showLegend = true,
  layout = "horizontal",
  className,
}: BarChartProps) {
  const config = React.useMemo(() => {
    return categories.reduce((acc, category, i) => {
      acc[category] = {
        label: category,
        color: colors[i % colors.length],
      };
      return acc;
    }, {} as Record<string, { label: string; color: string }>);
  }, [categories, colors]);

  return (
    <ChartContainer config={config} className={className}>
      <ComposedChart data={data} layout={layout}>
        <CartesianGrid strokeDasharray="3 3" />
        {layout === "horizontal" ? (
          <>
            <XAxis
              dataKey={index}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={valueFormatter} />
          </>
        ) : (
          <>
            <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={valueFormatter} />
            <YAxis dataKey={index} type="category" tickLine={false} axisLine={false} tickMargin={8} />
          </>
        )}
        <ChartTooltip
          content={
            <ChartTooltipContent 
              valueFormatter={valueFormatter} 
              indicator="line"
            />
          }
        />
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]}
            radius={[4, 4, 0, 0]}
            barSize={20}
            stackId="stack"
          />
        ))}
        {showLegend && (
          <Legend
            content={<ChartLegendContent payload={categories.map((category, i) => ({ 
              value: category, 
              color: colors[i % colors.length] 
            }))} />}
          />
        )}
      </ComposedChart>
    </ChartContainer>
  );
}

// PieChart component
interface PieChartProps {
  data: any[];
  index: string;
  category: string;
  valueFormatter?: (value: number) => string;
  showLabel?: boolean;
  showLegend?: boolean;
  className?: string;
}

export function PieChart({
  data,
  index,
  category,
  valueFormatter = (value) => `${value}`,
  showLabel = false,
  showLegend = true,
  className,
}: PieChartProps) {
  const config = React.useMemo(() => {
    return data.reduce((acc, item) => {
      acc[item[index]] = {
        label: item[index],
        color: item.fill || "#2563eb",
      };
      return acc;
    }, {} as Record<string, { label: string; color: string }>);
  }, [data, index]);

  return (
    <ChartContainer config={config} className={className}>
      <RechartsPieChart>
        <Pie
          data={data}
          dataKey={category}
          nameKey={index}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label={showLabel ? ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%` : false}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent 
              valueFormatter={valueFormatter} 
              indicator="dot"
            />
          }
        />
        {showLegend && (
          <Legend
            content={<ChartLegendContent payload={data.map((item) => ({ 
              value: item[index], 
              color: item.fill 
            }))} />}
          />
        )}
      </RechartsPieChart>
    </ChartContainer>
  );
}
