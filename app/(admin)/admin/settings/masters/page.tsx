'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
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
import { Search, Plus, Edit, MapPin, Users, CheckCircle, XCircle, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

export default function MastersSettingsPage() {
  const [venues, setVenues] = useState<Venue[]>(mockVenues)
  const [partners, setPartners] = useState<Partner[]>(mockPartners)

  const [searchTerm, setSearchTerm] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create')
  const [selectedItem, setSelectedItem] = useState<Venue | Partner | null>(null)
  const [activeTab, setActiveTab] = useState<'venues' | 'partners'>('venues')

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
    setDrawerOpen(true)
  }

  const handleEdit = (item: Venue | Partner) => {
    setDrawerMode('edit')
    setSelectedItem(item)
    setDrawerOpen(true)
  }

  const handleSave = () => {
    toast.success(
      drawerMode === 'create' ? '새 항목이 생성되었습니다' : '변경사항이 저장되었습니다'
    )
    setDrawerOpen(false)
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

  return (
    <div className="space-y-6">
      {/* Search & Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          새로 만들기
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'venues' | 'partners')}>
        <TabsList>
          <TabsTrigger value="venues">
            <MapPin className="mr-2 h-4 w-4" />
            예식장 ({venues.length})
          </TabsTrigger>
          <TabsTrigger value="partners">
            <Users className="mr-2 h-4 w-4" />
            협력사 ({partners.length})
          </TabsTrigger>
        </TabsList>

        {/* Venues Tab */}
        <TabsContent value="venues" className="space-y-4">
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>예식장명</TableHead>
                  <TableHead>타입</TableHead>
                  <TableHead>주소</TableHead>
                  <TableHead>연락처</TableHead>
                  <TableHead>홀 수</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead className="text-right">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVenues.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      검색 결과가 없습니다
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVenues.map((venue) => (
                    <TableRow key={venue.id}>
                      <TableCell className="font-medium">{venue.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{getVenueTypeLabel(venue.type)}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{venue.address}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-mono">{venue.phone}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{venue.ballrooms.length}개</Badge>
                      </TableCell>
                      <TableCell>
                        {venue.isActive ? (
                          <Badge variant="default" className="bg-green-600">
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
        </TabsContent>

        {/* Partners Tab */}
        <TabsContent value="partners" className="space-y-4">
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>협력사명</TableHead>
                  <TableHead>타입</TableHead>
                  <TableHead>담당자</TableHead>
                  <TableHead>연락처</TableHead>
                  <TableHead>이메일</TableHead>
                  <TableHead>수수료</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead className="text-right">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPartners.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      검색 결과가 없습니다
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPartners.map((partner) => (
                    <TableRow key={partner.id}>
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
                        <Badge variant="secondary">{getPartnerTypeLabel(partner.type)}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{partner.contactPerson}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-mono">{partner.phone}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{partner.email}</span>
                      </TableCell>
                      <TableCell>
                        {partner.commissionRate ? (
                          <Badge variant="outline">{partner.commissionRate}%</Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {partner.isActive ? (
                          <Badge variant="default" className="bg-green-600">
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
        </TabsContent>
      </Tabs>

      {/* Drawer for Create/Edit (Mock) */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {drawerMode === 'create' ? '새로 만들기' : '수정하기'}
            </SheetTitle>
            <SheetDescription>
              {activeTab === 'venues' && '예식장 정보를 입력하세요'}
              {activeTab === 'partners' && '협력사 정보를 입력하세요'}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              [Mock Editor - 실제 폼이 여기에 구현됩니다]
            </p>
            {selectedItem && (
              <pre className="rounded-lg bg-muted p-4 text-xs overflow-auto">
                {JSON.stringify(selectedItem, null, 2)}
              </pre>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              취소
            </Button>
            <Button onClick={handleSave}>
              {drawerMode === 'create' ? '생성' : '저장'}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

