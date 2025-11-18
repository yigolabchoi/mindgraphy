'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  mockVenues,
  mockPartners,
  type Venue,
  type Partner
} from '@/lib/mock/settings'
import { 
  Search, 
  Plus, 
  Edit, 
  MapPin, 
  Users, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  Building2,
  Handshake,
  TrendingUp,
  Phone,
  Mail
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function MastersSettingsPage() {
  const [venues, setVenues] = useState<Venue[]>(mockVenues)
  const [partners, setPartners] = useState<Partner[]>(mockPartners)

  const [searchTerm, setSearchTerm] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create')
  const [selectedItem, setSelectedItem] = useState<Venue | Partner | null>(null)
  const [activeTab, setActiveTab] = useState<'venues' | 'partners'>('venues')
  
  // Form state
  const [formData, setFormData] = useState<any>({})

  // Mock search
  const filteredVenues = venues.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.address.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const filteredPartners = partners.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreate = () => {
    setDrawerMode('create')
    setSelectedItem(null)
    setFormData({})
    setDrawerOpen(true)
  }

  const handleEdit = (item: Venue | Partner) => {
    setDrawerMode('edit')
    setSelectedItem(item)
    setFormData(item)
    setDrawerOpen(true)
  }

  const handleSave = () => {
    if (activeTab === 'venues') {
      // Venue save logic
      const ballroomsArray = formData.ballrooms 
        ? formData.ballrooms.split(',').map((b: string) => b.trim()).filter((b: string) => b)
        : []
      
      const venueData: Venue = {
        id: drawerMode === 'create' ? `venue-${Date.now()}` : formData.id,
        name: formData.name || '',
        type: formData.type || 'wedding_hall',
        address: formData.address || '',
        phone: formData.phone || '',
        ballrooms: ballroomsArray,
        parkingInfo: formData.parkingInfo,
        notes: formData.notes,
        isActive: formData.isActive !== undefined ? formData.isActive : true,
        createdAt: drawerMode === 'create' ? new Date().toISOString().split('T')[0] : formData.createdAt,
        updatedAt: new Date().toISOString().split('T')[0]
      }
      
      if (drawerMode === 'create') {
        setVenues([...venues, venueData])
      } else {
        setVenues(venues.map(v => v.id === venueData.id ? venueData : v))
      }
    } else {
      // Partner save logic
      const partnerData: Partner = {
        id: drawerMode === 'create' ? `partner-${Date.now()}` : formData.id,
        name: formData.name || '',
        type: formData.type || 'makeup',
        contactPerson: formData.contactPerson || '',
        phone: formData.phone || '',
        email: formData.email || '',
        address: formData.address,
        website: formData.website,
        commissionRate: formData.commissionRate ? Number(formData.commissionRate) : undefined,
        notes: formData.notes,
        isActive: formData.isActive !== undefined ? formData.isActive : true,
        createdAt: drawerMode === 'create' ? new Date().toISOString().split('T')[0] : formData.createdAt,
        updatedAt: new Date().toISOString().split('T')[0]
      }
      
      if (drawerMode === 'create') {
        setPartners([...partners, partnerData])
      } else {
        setPartners(partners.map(p => p.id === partnerData.id ? partnerData : p))
      }
    }
    
    toast.success(
      drawerMode === 'create' ? '새 항목이 생성되었습니다' : '변경사항이 저장되었습니다'
    )
    setDrawerOpen(false)
    setFormData({})
  }

  const getVenueTypeLabel = (type: Venue['type']) => {
    const labels = {
      wedding_hall: '웨딩홀',
      hotel: '호텔',
      church: '교회',
      outdoor: '야외',
      other: '기타'
    }
    return labels[type]
  }

  const getPartnerTypeLabel = (type: Partner['type']) => {
    const labels = {
      makeup: '메이크업',
      dress: '드레스',
      studio: '스튜디오',
      planner: '플래너',
      florist: '플로리스트',
      other: '기타'
    }
    return labels[type]
  }

  // Calculate statistics
  const activeVenues = venues.filter(v => v.isActive).length
  const activePartners = partners.filter(p => p.isActive).length
  const totalBallrooms = venues.reduce((sum, v) => sum + v.ballrooms.length, 0)
  const avgCommission = partners
    .filter(p => p.commissionRate)
    .reduce((sum, p) => sum + (p.commissionRate || 0), 0) / partners.filter(p => p.commissionRate).length

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm md:text-base text-muted-foreground">
          예식장과 협력사 정보를 관리하세요
        </p>
        <Button onClick={handleCreate} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          새로 만들기
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">활성 예식장</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeVenues}</div>
            <p className="text-xs text-muted-foreground">
              전체 {venues.length}개 중
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">활성 협력사</CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePartners}</div>
            <p className="text-xs text-muted-foreground">
              전체 {partners.length}개 중
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 홀 수</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBallrooms}</div>
            <p className="text-xs text-muted-foreground">
              {venues.length}개 예식장
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 수수료</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgCommission.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              협력사 평균
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'venues' | 'partners')}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="venues" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
            <MapPin className="h-3 w-3 md:h-4 md:w-4" />
            예식장
            <span className="hidden md:inline">({venues.length})</span>
          </TabsTrigger>
          <TabsTrigger value="partners" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
            <Users className="h-3 w-3 md:h-4 md:w-4" />
            협력사
            <span className="hidden md:inline">({partners.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* Venues Tab */}
        <TabsContent value="venues" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="min-w-[150px]">예식장명</TableHead>
                      <TableHead className="min-w-[100px]">타입</TableHead>
                      <TableHead className="min-w-[200px]">주소</TableHead>
                      <TableHead className="min-w-[120px]">연락처</TableHead>
                      <TableHead className="min-w-[80px]">홀 수</TableHead>
                      <TableHead className="min-w-[100px]">상태</TableHead>
                      <TableHead className="text-right min-w-[80px]">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVenues.length === 0 ? (
                      <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={7}>
                          <div className="flex flex-col items-center justify-center py-12 text-center">
                            <Building2 className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                            <h3 className="text-base md:text-lg font-semibold mb-1">예식장이 없습니다</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              {searchTerm ? '검색 결과가 없습니다' : '새 예식장을 추가하여 시작하세요'}
                            </p>
                            {!searchTerm && (
                              <Button onClick={handleCreate} variant="outline" size="sm">
                                <Plus className="mr-2 h-4 w-4" />
                                첫 예식장 추가
                              </Button>
                            )}
                          </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVenues.map((venue) => (
                        <TableRow key={venue.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">{venue.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{getVenueTypeLabel(venue.type)}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{venue.address}</span>
                      </TableCell>
                      <TableCell>
                            <a href={`tel:${venue.phone}`} className="text-sm font-mono hover:text-primary">
                              {venue.phone}
                            </a>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge variant="outline">{venue.ballrooms.length}개</Badge>
                          {venue.ballrooms.length > 0 && (
                            <div className="text-xs text-muted-foreground">
                              {venue.ballrooms.slice(0, 2).join(', ')}
                              {venue.ballrooms.length > 2 && ` 외 ${venue.ballrooms.length - 2}개`}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {venue.isActive ? (
                              <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            활성
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <XCircle className="mr-1 h-3 w-3" />
                            비활성
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(venue)}
                              className="hover:bg-muted"
                        >
                          <Edit className="h-4 w-4" />
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
        </TabsContent>

        {/* Partners Tab */}
        <TabsContent value="partners" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="min-w-[150px]">협력사명</TableHead>
                      <TableHead className="min-w-[100px]">타입</TableHead>
                      <TableHead className="min-w-[100px]">담당자</TableHead>
                      <TableHead className="min-w-[120px]">연락처</TableHead>
                      <TableHead className="min-w-[180px]">이메일</TableHead>
                      <TableHead className="min-w-[80px]">수수료</TableHead>
                      <TableHead className="min-w-[100px]">상태</TableHead>
                      <TableHead className="text-right min-w-[80px]">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPartners.length === 0 ? (
                      <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={8}>
                          <div className="flex flex-col items-center justify-center py-12 text-center">
                            <Handshake className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                            <h3 className="text-base md:text-lg font-semibold mb-1">협력사가 없습니다</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              {searchTerm ? '검색 결과가 없습니다' : '새 협력사를 추가하여 시작하세요'}
                            </p>
                            {!searchTerm && (
                              <Button onClick={handleCreate} variant="outline" size="sm">
                                <Plus className="mr-2 h-4 w-4" />
                                첫 협력사 추가
                              </Button>
                            )}
                          </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPartners.map((partner) => (
                        <TableRow key={partner.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{partner.name}</span>
                          {partner.website && (
                            <a
                              href={partner.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                            <Badge 
                              variant="secondary"
                              className={cn(
                                partner.type === 'makeup' && 'border-pink-200 bg-pink-50 text-pink-700',
                                partner.type === 'dress' && 'border-purple-200 bg-purple-50 text-purple-700',
                                partner.type === 'studio' && 'border-blue-200 bg-blue-50 text-blue-700',
                                partner.type === 'planner' && 'border-green-200 bg-green-50 text-green-700',
                                partner.type === 'florist' && 'border-yellow-200 bg-yellow-50 text-yellow-700'
                              )}
                            >
                              {getPartnerTypeLabel(partner.type)}
                            </Badge>
                      </TableCell>
                      <TableCell>
                            <div className="flex items-center gap-1 text-sm">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              {partner.contactPerson}
                            </div>
                      </TableCell>
                      <TableCell>
                            <a href={`tel:${partner.phone}`} className="flex items-center gap-1 text-sm font-mono hover:text-primary">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              {partner.phone}
                            </a>
                      </TableCell>
                      <TableCell>
                            <a href={`mailto:${partner.email}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                              <Mail className="h-3 w-3" />
                              {partner.email}
                            </a>
                      </TableCell>
                      <TableCell>
                        {partner.commissionRate ? (
                              <Badge variant="outline" className="font-mono">
                                {partner.commissionRate}%
                              </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {partner.isActive ? (
                              <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            활성
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <XCircle className="mr-1 h-3 w-3" />
                            비활성
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(partner)}
                              className="hover:bg-muted"
                        >
                          <Edit className="h-4 w-4" />
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
        </TabsContent>
      </Tabs>

      {/* Drawer for Create/Edit */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-xl">
              {activeTab === 'venues' ? (
                <>
                  <Building2 className="h-5 w-5" />
                  {drawerMode === 'create' ? '예식장 추가' : '예식장 수정'}
                </>
              ) : (
                <>
                  <Handshake className="h-5 w-5" />
                  {drawerMode === 'create' ? '협력사 추가' : '협력사 수정'}
                </>
              )}
            </SheetTitle>
            <SheetDescription>
              {activeTab === 'venues' 
                ? '예식장 정보를 입력하세요. 모든 필수 정보를 입력해주세요.' 
                : '협력사 정보를 입력하세요. 담당자 연락처는 필수입니다.'}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {activeTab === 'venues' ? (
              // Venue Form
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    기본 정보
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        예식장명 <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        placeholder="예: 더 그랜드 웨딩홀" 
                        value={formData.name || ''}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        타입 <span className="text-red-500">*</span>
                      </label>
                      <select 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.type || 'wedding_hall'}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                      >
                        <option value="wedding_hall">웨딩홀</option>
                        <option value="hotel">호텔</option>
                        <option value="church">교회</option>
                        <option value="outdoor">야외</option>
                        <option value="other">기타</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      주소 <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      placeholder="예: 서울시 강남구 테헤란로 123" 
                      value={formData.address || ''}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        연락처 <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        placeholder="02-1234-5678" 
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        상태 <span className="text-red-500">*</span>
                      </label>
                      <select 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={String(formData.isActive !== undefined ? formData.isActive : true)}
                        onChange={(e) => setFormData({...formData, isActive: e.target.value === 'true'})}
                      >
                        <option value="true">활성</option>
                        <option value="false">비활성</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      보유 홀 (쉼표로 구분)
                    </label>
                    <Input 
                      placeholder="예: 그랜드홀 (300석), 프리미어홀 (200석), 스위트홀 (100석)" 
                      value={formData.ballrooms ? (Array.isArray(formData.ballrooms) ? formData.ballrooms.join(', ') : formData.ballrooms) : ''}
                      onChange={(e) => setFormData({...formData, ballrooms: e.target.value})}
                    />
                    <p className="text-xs text-muted-foreground">
                      💡 각 홀을 쉼표로 구분하여 입력하세요. 예: "그랜드홀 (300석), 프리미어홀 (200석)"
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">주차 정보</label>
                    <Input 
                      placeholder="예: 지하 3층 주차장, 발렛파킹 가능" 
                      value={formData.parkingInfo || ''}
                      onChange={(e) => setFormData({...formData, parkingInfo: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">메모</label>
                    <Input 
                      placeholder="예: 천장 높이 5m, 자연광 우수" 
                      value={formData.notes || ''}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Partner Form
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    기본 정보
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        협력사명 <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        placeholder="예: 프리미엄 메이크업샵" 
                        value={formData.name || ''}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        타입 <span className="text-red-500">*</span>
                      </label>
                      <select 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.type || 'makeup'}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                      >
                        <option value="makeup">메이크업</option>
                        <option value="dress">드레스</option>
                        <option value="studio">스튜디오</option>
                        <option value="planner">플래너</option>
                        <option value="florist">플로리스트</option>
                        <option value="other">기타</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        담당자명 <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        placeholder="예: 김미연" 
                        value={formData.contactPerson || ''}
                        onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        연락처 <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        placeholder="010-1234-5678" 
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      이메일 <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      type="email"
                      placeholder="example@email.com" 
                      value={formData.email || ''}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      주소
                    </label>
                    <Input 
                      placeholder="예: 서울시 강남구 압구정로 456" 
                      value={formData.address || ''}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" />
                        웹사이트
                      </label>
                      <Input 
                        placeholder="https://example.com" 
                        value={formData.website || ''}
                        onChange={(e) => setFormData({...formData, website: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        수수료율 (%)
                      </label>
                      <Input 
                        type="number"
                        placeholder="15" 
                        value={formData.commissionRate || ''}
                        onChange={(e) => setFormData({...formData, commissionRate: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      상태 <span className="text-red-500">*</span>
                    </label>
                    <select 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={String(formData.isActive !== undefined ? formData.isActive : true)}
                      onChange={(e) => setFormData({...formData, isActive: e.target.value === 'true'})}
                    >
                      <option value="true">활성</option>
                      <option value="false">비활성</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">메모</label>
                    <Input 
                      placeholder="예: 웨딩 전문, 출장 가능" 
                      value={formData.notes || ''}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tip Card */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="pt-4">
                <div className="flex gap-3">
                  <div className="text-blue-600 mt-0.5">💡</div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-blue-900">작성 팁</p>
                    <ul className="text-xs text-blue-700 space-y-1">
                      {activeTab === 'venues' ? (
                        <>
                          <li>• 정확한 주소와 연락처를 입력해주세요</li>
                          <li>• 홀 정보는 "(홀명 (수용인원))" 형식으로 입력하세요</li>
                          <li>• 주차 정보는 고객에게 중요한 정보입니다</li>
                        </>
                      ) : (
                        <>
                          <li>• 담당자 연락처는 실시간 연락 가능한 번호를 입력하세요</li>
                          <li>• 수수료율은 정확히 입력하여 계산 오류를 방지하세요</li>
                          <li>• 웹사이트는 고객에게 추가 정보 제공에 유용합니다</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-2">
            <Button variant="outline" onClick={() => setDrawerOpen(false)} className="w-full sm:w-auto">
              취소
            </Button>
            <Button onClick={handleSave} className="w-full sm:w-auto">
              <CheckCircle className="mr-2 h-4 w-4" />
              {drawerMode === 'create' ? '생성' : '저장'}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

