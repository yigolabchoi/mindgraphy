'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { TrendingUp, Camera, Star } from 'lucide-react'

// 월별 촬영 실적 데이터
const monthlyPerformanceData = [
  { month: '6월', shoots: 12, rating: 4.8 },
  { month: '7월', shoots: 15, rating: 4.7 },
  { month: '8월', shoots: 18, rating: 4.9 },
  { month: '9월', shoots: 16, rating: 4.8 },
  { month: '10월', shoots: 20, rating: 4.9 },
  { month: '11월', shoots: 22, rating: 5.0 }
]

// 주간 촬영 현황
const weeklyData = [
  { week: '1주', shoots: 5 },
  { week: '2주', shoots: 6 },
  { week: '3주', shoots: 7 },
  { week: '4주', shoots: 4 }
]

// 평점 추이
const ratingTrendData = [
  { period: '1월', rating: 4.5 },
  { period: '2월', rating: 4.6 },
  { period: '3월', rating: 4.7 },
  { period: '4월', rating: 4.6 },
  { period: '5월', rating: 4.8 },
  { period: '6월', rating: 4.9 }
]

export function MonthlyPerformanceChart() {
  return (
    <Card className="border-0 ring-1 ring-zinc-200/50 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Camera className="h-5 w-5 text-blue-600" />
          월별 촬영 실적
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Legend />
            <Bar
              dataKey="shoots"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
              name="촬영 건수"
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">6개월 평균</span>
          <span className="font-semibold text-blue-600">
            {(monthlyPerformanceData.reduce((sum, d) => sum + d.shoots, 0) / monthlyPerformanceData.length).toFixed(1)}건/월
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export function RatingTrendChart() {
  return (
    <Card className="border-0 ring-1 ring-zinc-200/50 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Star className="h-5 w-5 text-yellow-600" />
          평점 추이
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={ratingTrendData}>
            <defs>
              <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="period" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              domain={[4.0, 5.0]}
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              ticks={[4.0, 4.2, 4.4, 4.6, 4.8, 5.0]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value: any) => [`⭐ ${value}`, '평점']}
            />
            <Area
              type="monotone"
              dataKey="rating"
              stroke="#fbbf24"
              strokeWidth={3}
              fill="url(#colorRating)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">최근 평점</span>
          <span className="font-semibold text-yellow-600 flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-600" />
            {ratingTrendData[ratingTrendData.length - 1].rating}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export function WeeklyShootsChart() {
  return (
    <Card className="border-0 ring-1 ring-zinc-200/50 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="h-5 w-5 text-green-600" />
          이번 달 주간 현황
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="week" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value: any) => [`${value}건`, '촬영']}
            />
            <Line
              type="monotone"
              dataKey="shoots"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">이번 달 총 촬영</span>
          <span className="font-semibold text-green-600">
            {weeklyData.reduce((sum, d) => sum + d.shoots, 0)}건
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

