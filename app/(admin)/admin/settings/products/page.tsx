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
  mockProducts,
  mockProductOptions,
  mockPolicies,
  type Product,
  type ProductOption,
  type Policy
} from '@/lib/mock/settings'
import { Search, Plus, Edit, FileText, CheckCircle, XCircle } from 'lucide-react'
import { toast } from 'sonner'
import { formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export default function ProductsSettingsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [options, setOptions] = useState<ProductOption[]>(mockProductOptions)
  const [policies, setPolicies] = useState<Policy[]>(mockPolicies)

  const [searchTerm, setSearchTerm] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create')
  const [selectedItem, setSelectedItem] = useState<Product | ProductOption | Policy | null>(null)
  const [activeTab, setActiveTab] = useState<'products' | 'options' | 'policies'>('products')

  // Mock search (filters by name)
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const filteredOptions = options.filter(o =>
    o.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const filteredPolicies = policies.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreate = () => {
    setDrawerMode('create')
    setSelectedItem(null)
    setDrawerOpen(true)
  }

  const handleEdit = (item: Product | ProductOption | Policy) => {
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

  const handleDelete = (id: string) => {
    if (activeTab === 'products') {
      setProducts(prev => prev.filter(p => p.id !== id))
    } else if (activeTab === 'options') {
      setOptions(prev => prev.filter(o => o.id !== id))
    } else {
      setPolicies(prev => prev.filter(p => p.id !== id))
    }
    toast.success('삭제되었습니다')
  }

  const getCategoryLabel = (category: Product['category']) => {
    const labels = {
      wedding: '웨딩',
      studio: '스튜디오',
      event: '이벤트',
      commercial: '상업'
    }
    return labels[category]
  }

  const getTypeLabel = (type: ProductOption['type']) => {
    return type === 'addon' ? '추가옵션' : '업그레이드'
  }

  const getPolicyTypeLabel = (type: Policy['type']) => {
    const labels = {
      cancellation: '취소/환불',
      refund: '환불',
      usage: '이용약관',
      privacy: '개인정보'
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
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'products' | 'options' | 'policies')}>
        <TabsList>
          <TabsTrigger value="products">
            상품 ({products.length})
          </TabsTrigger>
          <TabsTrigger value="options">
            옵션 ({options.length})
          </TabsTrigger>
          <TabsTrigger value="policies">
            정책 ({policies.length})
          </TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-4">
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>상품명</TableHead>
                  <TableHead>카테고리</TableHead>
                  <TableHead>기본가격</TableHead>
                  <TableHead>최대 선택</TableHead>
                  <TableHead>납품기간</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead className="text-right">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      검색 결과가 없습니다
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{getCategoryLabel(product.category)}</Badge>
                      </TableCell>
                      <TableCell>{formatCurrency(product.basePrice)}</TableCell>
                      <TableCell>{product.maxProofSelections}장</TableCell>
                      <TableCell>{product.turnAroundDays}일</TableCell>
                      <TableCell>
                        {product.isActive ? (
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
                          onClick={() => handleEdit(product)}
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

        {/* Options Tab */}
        <TabsContent value="options" className="space-y-4">
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>옵션명</TableHead>
                  <TableHead>타입</TableHead>
                  <TableHead>가격</TableHead>
                  <TableHead>적용 상품</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead className="text-right">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      검색 결과가 없습니다
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOptions.map((option) => (
                    <TableRow key={option.id}>
                      <TableCell className="font-medium">{option.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{getTypeLabel(option.type)}</Badge>
                      </TableCell>
                      <TableCell>{formatCurrency(option.price)}</TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {option.applicableProducts.length}개 상품
                        </span>
                      </TableCell>
                      <TableCell>
                        {option.isActive ? (
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
                          onClick={() => handleEdit(option)}
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

        {/* Policies Tab */}
        <TabsContent value="policies" className="space-y-4">
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>정책명</TableHead>
                  <TableHead>타입</TableHead>
                  <TableHead>버전</TableHead>
                  <TableHead>시행일</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead className="text-right">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPolicies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      검색 결과가 없습니다
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPolicies.map((policy) => (
                    <TableRow key={policy.id}>
                      <TableCell className="font-medium">{policy.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{getPolicyTypeLabel(policy.type)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {policy.version}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(policy.effectiveDate), 'yyyy.MM.dd', { locale: ko })}
                      </TableCell>
                      <TableCell>
                        {policy.isActive ? (
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
                          onClick={() => handleEdit(policy)}
                        >
                          <FileText className="h-4 w-4" />
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
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>
              {drawerMode === 'create' ? '새로 만들기' : '수정하기'}
            </SheetTitle>
            <SheetDescription>
              {activeTab === 'products' && '상품 정보를 입력하세요'}
              {activeTab === 'options' && '옵션 정보를 입력하세요'}
              {activeTab === 'policies' && '정책 정보를 입력하세요'}
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

