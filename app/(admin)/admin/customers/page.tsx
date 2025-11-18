'use client'

import { useState } from 'react'
import { AdminLayout } from '@/components/layout/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { KPICard, StatCard, ProgressStat, StatusBadge } from '@/components/common'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CustomerDetailDialog } from '@/components/customers/customer-detail-dialog'
import { mockCustomers, mockProjects, mockContracts, mockPayments } from '@/lib/mock-data'
import { mockProducts } from '@/lib/mock/settings'
import { formatDate } from '@/lib/utils'
import type { Customer, Project, Contract } from '@/lib/types'
import { 
  Plus, 
  Search, 
  Users,
  CheckCircle,
  Clock,
  Star,
  PhoneCall,
  Calendar,
  BarChart3,
  PieChart,
  SlidersHorizontal,
  ArrowUpDown,
  CreditCard
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useMemo } from 'react'
import { 
  StageDistributionChart, 
  SatisfactionTrendChart
} from '@/components/customers/customer-trend-charts'

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customersWithStats[0] | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'trends'>('active')
  
  // Filter and sort states
  const [stageFilter, setStageFilter] = useState<string>('all')
  const [satisfactionFilter, setSatisfactionFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'latest' | 'name' | 'projects' | 'revenue'>('latest')

  // 현재 진행 단계 계산
  const getCurrentStage = (customer: Customer, projects: Project[], _contracts: unknown[]) => {
    const activeProjects = projects.filter(p => 
      p.projectStatus !== 'completed' && p.projectStatus !== 'delivered' && p.projectStatus !== 'cancelled'
    )
    
    if (activeProjects.length === 0) {
      const hasCompleted = projects.some(p => p.projectStatus === 'completed' || p.projectStatus === 'delivered')
      return hasCompleted ? { label: '완료', color: 'bg-green-100 text-green-800 border-green-200' } : 
             { label: '대기', color: 'bg-gray-100 text-gray-800 border-gray-200' }
    }

    // 가장 진행 중인 프로젝트의 상태로 판단
    const mostRecentActive = activeProjects[0]
    const status = mostRecentActive.projectStatus
    
    if (status === 'scheduled') return { label: '촬영 예정', color: 'bg-blue-100 text-blue-800 border-blue-200' }
    if (status === 'in_progress') return { label: '촬영 중', color: 'bg-purple-100 text-purple-800 border-purple-200' }
    if (status === 'proof_ready') return { label: '시안 확인', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' }
    if (status === 'editing') return { label: '편집 중', color: 'bg-orange-100 text-orange-800 border-orange-200' }
    
    return { label: '진행 중', color: 'bg-blue-100 text-blue-800 border-blue-200' }
  }

  // 입금 상태 확인 (Payment 데이터 기반)
  const getPaymentStatus = (customer: Customer, contracts: Contract[]) => {
    const customerContracts = contracts.filter(c => c.customerId === customer.id)
    if (customerContracts.length === 0) return { paid: 0, total: 0, percent: 0 }
    
    // 고객의 총 계약 금액
    const totalAmount = customerContracts.reduce((sum, c) => sum + (c.totalAmount || 0), 0)
    
    // 고객의 계약들에 대한 실제 입금된 금액 (Payment 집계)
    const contractIds = customerContracts.map(c => c.id)
    const paidAmount = mockPayments
      .filter(p => contractIds.includes(p.contractId) && p.paymentStatus === 'completed')
      .reduce((sum, p) => sum + (p.amount || 0), 0)
    
    const percent = totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0
    
    return { paid: paidAmount / 10000, total: totalAmount / 10000, percent }
  }

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
      latestProject: customerProjects[0],
      currentStage: getCurrentStage(customer, customerProjects, customerContracts),
      paymentStatus: getPaymentStatus(customer, mockContracts)
    }
  })

  // 검색 및 필터링, 정렬
  const filteredCustomers = useMemo(() => {
    let filtered = [...customersWithStats]
    
    // Active/Completed filter based on tab
    if (activeTab === 'active') {
      // 진행 중: 진행 중인 프로젝트가 있는 고객
      filtered = filtered.filter(c => c.activeProjects > 0)
    } else if (activeTab === 'completed') {
      // 완료: 진행 중인 프로젝트가 없고, 완료된 프로젝트가 있는 고객
      filtered = filtered.filter(c => c.activeProjects === 0 && c.completedProjects > 0)
    }
    
    // Search filter
    if (searchQuery) {
      const searchTerm = searchQuery.toLowerCase()
      filtered = filtered.filter(customer =>
        customer.groomName.toLowerCase().includes(searchTerm) ||
        customer.brideName.toLowerCase().includes(searchTerm) ||
        customer.groomPhone?.includes(searchTerm) ||
        customer.bridePhone?.includes(searchTerm) ||
        customer.email?.toLowerCase().includes(searchTerm)
      )
    }
    
    // Stage filter
    if (stageFilter !== 'all') {
      filtered = filtered.filter(c => c.currentStage.label === stageFilter)
    }
    
    // Satisfaction filter (based on mock data, assuming 4-5 stars for completed projects)
    if (satisfactionFilter !== 'all') {
      filtered = filtered.filter(c => {
        // Mock satisfaction based on completion status
        const hasCompleted = c.completedProjects > 0
        const avgRating = hasCompleted ? 4.5 : 0 // Simplified mock rating
        if (satisfactionFilter === '4+') return avgRating >= 4
        if (satisfactionFilter === '3') return avgRating >= 3 && avgRating < 4
        if (satisfactionFilter === '2-') return avgRating < 3 && avgRating > 0
        return true
      })
    }
    
    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        case 'name':
          return a.groomName.localeCompare(b.groomName)
        case 'projects':
          return b.totalProjects - a.totalProjects
        case 'revenue':
          return b.totalRevenue - a.totalRevenue
        default:
          return 0
      }
    })
    
    return filtered
  }, [customersWithStats, searchQuery, stageFilter, satisfactionFilter, sortBy, activeTab])

  // KPI 계산
  const totalCustomers = customersWithStats.length
  const activeCustomers = customersWithStats.filter(c => c.activeProjects > 0).length
  const completedCustomers = customersWithStats.filter(c => c.completedProjects > 0 && c.activeProjects === 0).length
  const totalRevenue = customersWithStats.reduce((sum, c) => sum + c.totalRevenue, 0)
  const avgRevenue = totalCustomers > 0 ? totalRevenue / totalCustomers : 0
  
  // 단계별 분포
  const stageDistribution = {
    '촬영 예정': customersWithStats.filter(c => c.currentStage.label === '촬영 예정').length,
    '촬영 중': customersWithStats.filter(c => c.currentStage.label === '촬영 중').length,
    '시안 확인': customersWithStats.filter(c => c.currentStage.label === '시안 확인').length,
    '편집 중': customersWithStats.filter(c => c.currentStage.label === '편집 중').length,
    '완료': customersWithStats.filter(c => c.currentStage.label === '완료').length,
  }

  const handleViewCustomer = (customer: typeof customersWithStats[0]) => {
    setSelectedCustomer(customer)
    setDetailDialogOpen(true)
  }

  const handleCheckPayment = (customer: typeof customersWithStats[0]) => {
    const { paid, total, percent } = customer.paymentStatus
    if (percent === 100) {
      toast.success(`${customer.groomName} & ${customer.brideName}님 - 입금 완료 (${total.toLocaleString('ko-KR')}만원)`)
    } else if (percent > 0) {
      toast.info(`${customer.groomName} & ${customer.brideName}님 - ${percent}% 입금 완료 (${paid.toLocaleString('ko-KR')}/${total.toLocaleString('ko-KR')}만원)`)
    } else {
      toast.warning(`${customer.groomName} & ${customer.brideName}님 - 미입금 (${total.toLocaleString('ko-KR')}만원)`)
    }
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
        <div className="grid gap-4 md:grid-cols-3 animate-in fade-in slide-in-from-bottom duration-300">
          <KPICard
            title="전체 고객"
            value={totalCustomers}
            description="총 등록 고객 수"
            icon={Users}
            valueClassName="group-hover:text-blue-600"
            onClick={() => {}}
          />
          
          <KPICard
            title="진행 중"
            value={activeCustomers}
            description="현재 진행 중인 고객"
            icon={Clock}
            valueClassName="text-blue-600"
            onClick={() => {}}
          />
          
          <KPICard
            title="완료"
            value={completedCustomers}
            description="촬영 완료 고객"
            icon={CheckCircle}
            valueClassName="text-green-600"
            onClick={() => {}}
          />
        </div>

        {/* Tabs for Active, Completed and Trends */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'active' | 'completed' | 'trends')} className="animate-in fade-in slide-in-from-bottom duration-500">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              진행 중 ({activeCustomers})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              완료 ({completedCustomers})
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              트렌드 분석
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6 space-y-4">
            {/* Filters & Sort */}
            <Card className="border-0 ring-1 ring-zinc-200/50 shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Search & Sort Row */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="고객명, 연락처, 이메일로 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 focus-ring"
                      />
                    </div>
                    <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="정렬" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="latest">최신 등록순</SelectItem>
                        <SelectItem value="name">고객명순</SelectItem>
                        <SelectItem value="projects">프로젝트 많은순</SelectItem>
                        <SelectItem value="revenue">매출 높은순</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Filter Row */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="font-medium">필터:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Select value={stageFilter} onValueChange={setStageFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="진행 단계" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">모든 단계</SelectItem>
                        <SelectItem value="촬영 예정">촬영 예정</SelectItem>
                        <SelectItem value="촬영 중">촬영 중</SelectItem>
                        <SelectItem value="시안 확인">시안 확인</SelectItem>
                        <SelectItem value="편집 중">편집 중</SelectItem>
                        <SelectItem value="완료">완료</SelectItem>
                        <SelectItem value="대기">대기</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={satisfactionFilter} onValueChange={setSatisfactionFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="만족도" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">모든 만족도</SelectItem>
                        <SelectItem value="4+">⭐ 4점 이상</SelectItem>
                        <SelectItem value="3">⭐ 3점대</SelectItem>
                        <SelectItem value="2-">⭐ 3점 미만</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Active Filters */}
                  {(stageFilter !== 'all' || satisfactionFilter !== 'all' || searchQuery) && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-muted-foreground">활성 필터:</span>
                      {searchQuery && (
                        <Badge variant="secondary" className="gap-1">
                          검색: {searchQuery}
                          <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-foreground">×</button>
                        </Badge>
                      )}
                      {stageFilter !== 'all' && (
                        <Badge variant="secondary" className="gap-1">
                          단계: {stageFilter}
                          <button onClick={() => setStageFilter('all')} className="ml-1 hover:text-foreground">×</button>
                        </Badge>
                      )}
                      {satisfactionFilter !== 'all' && (
                        <Badge variant="secondary" className="gap-1">
                          만족도: {satisfactionFilter === '4+' ? '4점 이상' : satisfactionFilter === '3' ? '3점대' : '3점 미만'}
                          <button onClick={() => setSatisfactionFilter('all')} className="ml-1 hover:text-foreground">×</button>
                        </Badge>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setSearchQuery('')
                          setStageFilter('all')
                          setSatisfactionFilter('all')
                        }}
                        className="h-6 text-xs"
                      >
                        전체 초기화
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Customers Table */}
            <Card className="border-0 ring-1 ring-zinc-200/50 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>고객 목록</span>
                  <Badge variant="secondary">{filteredCustomers.length}명</Badge>
                </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>고객명</TableHead>
                    <TableHead>연락처</TableHead>
                    <TableHead className="text-center">상품타입</TableHead>
                    <TableHead className="text-center">패키지</TableHead>
                    <TableHead className="text-center">현재 단계</TableHead>
                    <TableHead className="text-center">입금 상태</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        {searchQuery ? '검색 결과가 없습니다.' : '등록된 고객이 없습니다.'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCustomers.map((customer, idx) => (
                      <TableRow 
                        key={customer.id}
                        onClick={() => handleViewCustomer(customer)}
                        className="cursor-pointer hover:bg-gradient-to-r hover:from-zinc-50 hover:to-transparent transition-all animate-in fade-in slide-in-from-bottom"
                        style={{ animationDelay: `${idx * 30}ms` }}
                      >
                        <TableCell>
                          <div className="font-medium">
                            {customer.groomName} & {customer.brideName}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 text-sm">
                            <div className="flex items-center gap-1 text-zinc-700">
                              <PhoneCall className="h-3 w-3" />
                              신랑: {customer.groomPhone}
                            </div>
                            <div className="flex items-center gap-1 text-zinc-700">
                              <PhoneCall className="h-3 w-3" />
                              신부: {customer.bridePhone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {customer.latestProject?.projectType ? (
                            <Badge variant="outline" className={
                              customer.latestProject.projectType === 'hanbok' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                              customer.latestProject.projectType === 'dress_shop' ? 'bg-pink-50 text-pink-700 border-pink-200' :
                              customer.latestProject.projectType === 'baby' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              'bg-zinc-50 text-zinc-700 border-zinc-200'
                            }>
                              {customer.latestProject.projectType === 'wedding' ? '일반 웨딩' :
                               customer.latestProject.projectType === 'hanbok' ? '한복 & 캐주얼' :
                               customer.latestProject.projectType === 'dress_shop' ? '가봉 스냅' :
                               customer.latestProject.projectType === 'baby' ? '돌스냅' : '-'}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-xs">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {customer.latestProject?.packageId ? (
                            <div className="text-xs font-medium">
                              {mockProducts.find(p => p.id === customer.latestProject?.packageId)?.name || customer.latestProject.packageId}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-xs">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <StatusBadge status={customer.currentStage.label} />
                        </TableCell>
                        <TableCell className="text-center">
                          <button
                            onClick={() => handleCheckPayment(customer)}
                            className="flex flex-col items-center gap-1 w-full hover:bg-muted rounded-lg p-2 transition-all focus-ring"
                          >
                            <div className="flex items-center gap-1">
                              <CreditCard className="h-3 w-3" />
                              <span className={`text-xs font-medium ${
                                customer.paymentStatus.percent === 100 ? 'text-green-600' :
                                customer.paymentStatus.percent > 0 ? 'text-orange-600' :
                                'text-red-600'
                              }`}>
                                {customer.paymentStatus.percent}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full transition-all ${
                                  customer.paymentStatus.percent === 100 ? 'bg-green-600' :
                                  customer.paymentStatus.percent > 0 ? 'bg-orange-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${customer.paymentStatus.percent}%` }}
                              />
                            </div>
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
          </TabsContent>

          <TabsContent value="completed" className="mt-6 space-y-4">
            {/* Same content as active tab */}
            {/* Filters & Sort */}
            <Card className="border-0 ring-1 ring-zinc-200/50 shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Search & Sort Row */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="고객명, 연락처, 이메일로 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 focus-ring"
                      />
                    </div>
                    <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="정렬" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="latest">최신 등록순</SelectItem>
                        <SelectItem value="name">고객명순</SelectItem>
                        <SelectItem value="projects">프로젝트 많은순</SelectItem>
                        <SelectItem value="revenue">매출 높은순</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Active Filters */}
                  {searchQuery && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-muted-foreground">활성 필터:</span>
                      <Badge variant="secondary" className="gap-1">
                        검색: {searchQuery}
                        <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-foreground">×</button>
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Customer Table */}
            <Card className="border-0 ring-1 ring-zinc-200/50 shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[180px]">고객명</TableHead>
                    <TableHead className="w-[140px]">연락처</TableHead>
                    <TableHead className="w-[110px] text-center">상품타입</TableHead>
                    <TableHead className="w-[100px] text-center">패키지</TableHead>
                    <TableHead className="w-[100px] text-center">진행상태</TableHead>
                    <TableHead className="w-[100px] text-center">입금현황</TableHead>
                    <TableHead className="w-[100px] text-right">매출</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                        완료된 고객이 없습니다
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCustomers.map((customer, idx) => (
                      <TableRow 
                        key={customer.id}
                        onClick={() => handleViewCustomer(customer)}
                        className="cursor-pointer hover:bg-muted/50 transition-colors animate-in fade-in slide-in-from-bottom"
                        style={{ animationDelay: `${idx * 30}ms` }}
                      >
                        <TableCell className="font-medium">
                          <div className="space-y-1">
                            <div>{customer.groomName} & {customer.brideName}</div>
                            <div className="text-xs text-muted-foreground">{customer.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-1 text-zinc-700">
                              <PhoneCall className="h-3 w-3" />
                              {customer.groomPhone}
                            </div>
                            <div className="flex items-center gap-1 text-zinc-700">
                              <PhoneCall className="h-3 w-3" />
                              {customer.bridePhone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {customer.latestProject?.projectType ? (
                            <Badge variant="outline" className={
                              customer.latestProject.projectType === 'hanbok' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                              customer.latestProject.projectType === 'dress_shop' ? 'bg-pink-50 text-pink-700 border-pink-200' :
                              customer.latestProject.projectType === 'baby' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              'bg-zinc-50 text-zinc-700 border-zinc-200'
                            }>
                              {customer.latestProject.projectType === 'wedding' ? '일반 웨딩' :
                               customer.latestProject.projectType === 'hanbok' ? '한복 & 캐주얼' :
                               customer.latestProject.projectType === 'dress_shop' ? '가봉 스냅' :
                               customer.latestProject.projectType === 'baby' ? '돌스냅' : '-'}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-xs">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {customer.latestProject?.packageId ? (
                            <div className="text-xs font-medium">
                              {mockProducts.find(p => p.id === customer.latestProject?.packageId)?.name || customer.latestProject.packageId}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-xs">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={customer.currentStage.color}>
                            {customer.currentStage.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <button
                            onClick={() => handleCheckPayment(customer)}
                            className="flex flex-col items-center gap-1 w-full hover:bg-muted rounded-lg p-2 transition-all focus-ring"
                          >
                            <div className="flex items-center gap-1">
                              <CreditCard className="h-3 w-3" />
                              <span className={`text-xs font-medium ${
                                customer.paymentStatus.percent === 100 ? 'text-green-600' :
                                customer.paymentStatus.percent > 0 ? 'text-orange-600' :
                                'text-red-600'
                              }`}>
                                {customer.paymentStatus.percent}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full transition-all ${
                                  customer.paymentStatus.percent === 100 ? 'bg-green-600' :
                                  customer.paymentStatus.percent > 0 ? 'bg-orange-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${customer.paymentStatus.percent}%` }}
                              />
                            </div>
                          </button>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {customer.totalRevenue.toLocaleString('ko-KR')}만원
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
          </TabsContent>

          <TabsContent value="trends" className="mt-6 space-y-4">
            {/* 단계별 고객 분포 */}
            <StatCard title="단계별 고객 분포" icon={PieChart} animationDelay={1000}>
              <div className="space-y-4">
                {Object.entries(stageDistribution).map(([stage, count], idx) => {
                  const percentage = totalCustomers > 0 ? Math.round((count / totalCustomers) * 100) : 0
                  const colorMap: Record<string, 'blue' | 'purple' | 'yellow' | 'orange' | 'green'> = {
                    '촬영 예정': 'blue',
                    '촬영 중': 'purple',
                    '시안 확인': 'yellow',
                    '편집 중': 'orange',
                    '완료': 'green',
                  }
                  
                  return (
                    <ProgressStat
                      key={stage}
                      label={stage}
                      value={count}
                      total={totalCustomers}
                      percentage={percentage}
                      color={colorMap[stage] || 'blue'}
                      animationDelay={idx * 100}
                    />
                  )
                })}
              </div>
            </StatCard>

            {/* 추가 인사이트 카드들 */}
            <div className="grid gap-4 md:grid-cols-2">
              <StatCard title="평균 프로젝트 수" animationDelay={300}>
                <div className="text-3xl font-bold">
                  {(customersWithStats.reduce((sum, c) => sum + c.totalProjects, 0) / totalCustomers || 0).toFixed(1)}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  고객당 평균 촬영 횟수
                </p>
              </StatCard>

              <StatCard title="고객 만족도" animationDelay={500}>
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold">4.8</div>
                  <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  5점 만점 기준
                </p>
              </StatCard>
            </div>

            {/* Trend Charts */}
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                상세 트렌드 분석
              </h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <StageDistributionChart />
                <SatisfactionTrendChart />
              </div>
              
              <Card className="border-0 ring-1 ring-zinc-200/50 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">이번 달 하이라이트</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <div className="text-muted-foreground mb-1">평균 매출</div>
                    <div className="text-2xl font-bold">
                      {avgRevenue.toLocaleString('ko-KR')}만원
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="text-muted-foreground mb-1">활성 고객</div>
                    <div className="text-xl font-bold text-blue-600">
                      {activeCustomers}명
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
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

