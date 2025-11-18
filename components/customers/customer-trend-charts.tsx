'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { TrendingUp, Users, Calendar, Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

// 월별 신규 고객
const newCustomersData = [
  { month: '6월', new: 12, returning: 3 },
  { month: '7월', new: 15, returning: 4 },
  { month: '8월', new: 18, returning: 5 },
  { month: '9월', new: 16, returning: 6 },
  { month: '10월', new: 20, returning: 7 },
  { month: '11월', new: 22, returning: 8 }
]

// 고객 단계별 분포
const stageDistributionData = [
  { name: '촬영 예정', value: 25, color: '#3b82f6' },
  { name: '촬영 중', value: 15, color: '#8b5cf6' },
  { name: '시안 확인', value: 18, color: '#f59e0b' },
  { name: '편집 중', value: 20, color: '#f97316' },
  { name: '완료', value: 45, color: '#10b981' }
]

// 월별 고객 만족도
const satisfactionData = [
  { month: '6월', satisfaction: 4.6 },
  { month: '7월', satisfaction: 4.7 },
  { month: '8월', satisfaction: 4.8 },
  { month: '9월', satisfaction: 4.7 },
  { month: '10월', satisfaction: 4.9 },
  { month: '11월', satisfaction: 4.9 }
]

// 재촬영 고객 추이
const repeatCustomerData = [
  { month: '6월', repeat: 15 },
  { month: '7월', repeat: 18 },
  { month: '8월', repeat: 22 },
  { month: '9월', repeat: 20 },
  { month: '10월', repeat: 25 },
  { month: '11월', repeat: 28 }
]

export function NewCustomersTrendChart() {
  return (
    <Card className="border-0 ring-1 ring-zinc-200/50 shadow-sm col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            신규 & 재방문 고객 추이
          </div>
          <Badge variant="secondary" className="text-xs">
            최근 6개월
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={newCustomersData}>
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
              dataKey="new"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
              name="신규 고객"
            />
            <Bar
              dataKey="returning"
              fill="#10b981"
              radius={[8, 8, 0, 0]}
              name="재방문 고객"
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-3 gap-4 border-t pt-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">총 신규</div>
            <div className="text-lg font-bold text-blue-600">
              {newCustomersData.reduce((sum, d) => sum + d.new, 0)}명
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">총 재방문</div>
            <div className="text-lg font-bold text-green-600">
              {newCustomersData.reduce((sum, d) => sum + d.returning, 0)}명
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">재방문율</div>
            <div className="text-lg font-bold text-purple-600">
              {Math.round(
                (newCustomersData.reduce((sum, d) => sum + d.returning, 0) /
                  newCustomersData.reduce((sum, d) => sum + d.new, 0)) * 100
              )}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function StageDistributionChart() {
  return (
    <Card className="border-0 ring-1 ring-zinc-200/50 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-600" />
          고객 단계별 분포
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={stageDistributionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
            >
              {stageDistributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value: any) => [`${value}명`, '고객 수']}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2 mt-4">
          {stageDistributionData.map((stage) => (
            <div key={stage.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: stage.color }}
                />
                <span className="text-muted-foreground">{stage.name}</span>
              </div>
              <span className="font-medium">{stage.value}명</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function SatisfactionTrendChart() {
  return (
    <Card className="border-0 ring-1 ring-zinc-200/50 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-pink-600" />
          고객 만족도 추이
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={satisfactionData}>
            <defs>
              <linearGradient id="colorSatisfaction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
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
              formatter={(value: any) => [`⭐ ${value}`, '만족도']}
            />
            <Area
              type="monotone"
              dataKey="satisfaction"
              stroke="#ec4899"
              strokeWidth={3}
              fill="url(#colorSatisfaction)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <span className="text-sm text-muted-foreground">현재 평균</span>
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 fill-pink-600 text-pink-600" />
            <span className="text-lg font-bold text-pink-600">
              {satisfactionData[satisfactionData.length - 1].satisfaction}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function RepeatCustomerChart() {
  return (
    <Card className="border-0 ring-1 ring-zinc-200/50 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          재촬영 고객 증가 추이
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={repeatCustomerData}>
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
              formatter={(value: any) => [`${value}%`, '비율']}
            />
            <Line
              type="monotone"
              dataKey="repeat"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <span className="text-sm text-muted-foreground">증가율</span>
          <Badge variant="secondary" className="text-green-600 bg-green-50">
            +{repeatCustomerData[repeatCustomerData.length - 1].repeat - repeatCustomerData[0].repeat}% 
            (6개월)
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

