'use client'

import { useState } from 'react'
import { AdminLayout } from '@/components/layout/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CustomerDetailDialog } from '@/components/customers/customer-detail-dialog'
import { mockCustomers, mockProjects, mockContracts } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import { 
  Plus, 
  Search, 
  Eye, 
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react'

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)

  // 고객별 프로젝트 통계 계산
  const customersWithStats = mockCustomers.map(customer => {
    const customerProjects = mockProjects.filter(p => p.customerId === customer.id)
    const customerContracts = mockContracts.filter(c => c.customerId === customer.id)
    const completedProjects = customerProjects.filter(p => 
      p.projectStatus === 'completed' || p.projectStatus === 'delivered'
    ).length
    const activeProjects = customerProjects.filter(p => 
      p.projectStatus !== 'completed' && p.projectStatus !== 'delivered' && p.projectStatus !== 'cancelled'
    ).length
    const totalRevenue = customerContracts.reduce((sum, c) => sum + (c.totalAmount || 0), 0)

    return {
      ...customer,
      totalProjects: customerProjects.length,
      completedProjects,
      activeProjects,
      totalRevenue: totalRevenue / 10000, // 만원 단위로 변환
      latestProject: customerProjects[0]
    }
  })

  // 검색 필터링
  const filteredCustomers = customersWithStats.filter(customer => {
    const searchTerm = searchQuery.toLowerCase()
    return (
      customer.groomName.toLowerCase().includes(searchTerm) ||
      customer.brideName.toLowerCase().includes(searchTerm) ||
      customer.groomPhone?.includes(searchTerm) ||
      customer.bridePhone?.includes(searchTerm) ||
      customer.email?.toLowerCase().includes(searchTerm)
    )
  })

  // KPI 계산
  const totalCustomers = customersWithStats.length
  const activeCustomers = customersWithStats.filter(c => c.activeProjects > 0).length
  const completedCustomers = customersWithStats.filter(c => c.completedProjects > 0 && c.activeProjects === 0).length
  const totalRevenue = customersWithStats.reduce((sum, c) => sum + c.totalRevenue, 0)
  const avgRevenue = totalCustomers > 0 ? totalRevenue / totalCustomers : 0

  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setDetailDialogOpen(true)
  }

  return (
    <AdminLayout align="left">
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              고객 관리
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              고객 정보와 진행 상황을 관리하세요
            </p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            고객 등록
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">전체 고객</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCustomers}</div>
              <p className="text-xs text-muted-foreground">
                총 등록 고객 수
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">진행 중</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{activeCustomers}</div>
              <p className="text-xs text-muted-foreground">
                현재 진행 중인 고객
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">완료</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedCustomers}</div>
              <p className="text-xs text-muted-foreground">
                촬영 완료 고객
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">평균 매출</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {avgRevenue.toLocaleString('ko-KR')}만
              </div>
              <p className="text-xs text-muted-foreground">
                고객당 평균 매출액
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="고객명, 연락처, 이메일로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>고객 목록</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>고객명</TableHead>
                    <TableHead>연락처</TableHead>
                    <TableHead>이메일</TableHead>
                    <TableHead className="text-center">총 촬영</TableHead>
                    <TableHead className="text-center">진행중</TableHead>
                    <TableHead className="text-center">완료</TableHead>
                    <TableHead className="text-right">총 매출</TableHead>
                    <TableHead className="text-center">최근 촬영일</TableHead>
                    <TableHead className="text-center">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        {searchQuery ? '검색 결과가 없습니다.' : '등록된 고객이 없습니다.'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="font-medium">
                            {customer.groomName} & {customer.brideName}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>신랑: {customer.groomPhone}</div>
                            <div className="text-muted-foreground">신부: {customer.bridePhone}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{customer.email || '-'}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline">{customer.totalProjects}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          {customer.activeProjects > 0 ? (
                            <Badge className="bg-blue-600">{customer.activeProjects}</Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {customer.completedProjects > 0 ? (
                            <Badge className="bg-green-600">{customer.completedProjects}</Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {customer.totalRevenue.toLocaleString('ko-KR')}만
                        </TableCell>
                        <TableCell className="text-center text-sm">
                          {customer.latestProject 
                            ? formatDate(customer.latestProject.weddingDate)
                            : '-'
                          }
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewCustomer(customer)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Detail Dialog */}
      <CustomerDetailDialog
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        customer={selectedCustomer}
      />
    </AdminLayout>
  )
}

