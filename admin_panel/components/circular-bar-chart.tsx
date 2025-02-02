"use client"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Orders", value: 85, color: "#FF6384" },
  { name: "Revenue", value: 70, color: "#36A2EB" },
  { name: "Users", value: 60, color: "#FFCE56" },
  { name: "Restaurants", value: 40, color: "#4BC0C0" },
]

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props
  return (
    <g>
      <path
        d={`M${cx},${cy} L${cx},${cy - outerRadius} A${outerRadius},${outerRadius} 0 0,1 ${cx + Math.sin(endAngle) * outerRadius},${cy - Math.cos(endAngle) * outerRadius} Z`}
        fill={fill}
        stroke={fill}
      />
      <circle cx={cx} cy={cy} r={innerRadius} fill="#fff" />
    </g>
  )
}

export function CircularBarChart() {
  return (
    <Card className="w-full h-[400px]">
      <CardHeader>
        <CardTitle>SpeedyQeats Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              activeShape={renderActiveShape}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

