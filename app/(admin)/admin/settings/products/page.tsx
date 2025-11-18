'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import {
  mockProducts,
  baseProducts,
  hanbokProducts,
  optionProducts,
  mockPolicies,
  mockContractTemplate
} from '@/lib/mock/settings'
import type { Product, Policy, ContractTemplate, ContractArticle } from '@/lib/types'
import { 
  Search, 
  Plus, 
  Edit, 
  FileText, 
  CheckCircle, 
  XCircle,
  Package,
  Settings,
  Shield,
  DollarSign,
  Layers,
  Camera,
  Image as ImageIcon
} from 'lucide-react'
import { toast } from 'sonner'
import { formatCurrency, cn } from '@/lib/utils'

export default function ProductsSettingsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [policies, setPolicies] = useState<Policy[]>(mockPolicies)
  const [contractTemplate, setContractTemplate] = useState<ContractTemplate>(mockContractTemplate)

  const [searchTerm, setSearchTerm] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create')
  const [selectedItem, setSelectedItem] = useState<Product | Policy | null>(null)
  const [activeTab, setActiveTab] = useState<'snap' | 'options' | 'policies'>('snap')
  
  const [contractDialogOpen, setContractDialogOpen] = useState(false)
  const [editingContract, setEditingContract] = useState<ContractTemplate | null>(null)

  // Separate products by category
  const snapProducts = products.filter(p => p.category === 'SNAP')
  const options = products.filter(p => p.category === 'OPTION')

  // Apply search filter
  const filteredSnapProducts = snapProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const filteredOptions = options.filter(o =>
    o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const filteredPolicies = policies.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreate = () => {
    setDrawerMode('create')
    setSelectedItem(null)
    setDrawerOpen(true)
  }

  const handleEdit = (item: Product | Policy) => {
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

  const handleToggleStatus = (id: string) => {
    if (activeTab === 'policies') {
      setPolicies(prev => prev.map(p => 
        p.id === id ? { ...p, isActive: !p.isActive } : p
      ))
    } else {
      setProducts(prev => prev.map(p => 
        p.id === id ? { ...p, isActive: !p.isActive } : p
      ))
    }
    toast.success('상태가 변경되었습니다')
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

  // Contract handlers
  const handleEditContract = () => {
    setEditingContract({...contractTemplate})
    setContractDialogOpen(true)
  }

  const handleSaveContract = () => {
    if (editingContract) {
      setContractTemplate(editingContract)
      toast.success('계약서가 저장되었습니다')
      setContractDialogOpen(false)
    }
  }

  const handleUpdateContractArticle = (articleId: string, field: 'title' | 'content', value: string | string[]) => {
    if (!editingContract) return
    
    const updatedArticles = editingContract.articles.map(article => {
      if (article.id === articleId) {
        return { ...article, [field]: value }
      }
      return article
    })
    
    setEditingContract({
      ...editingContract,
      articles: updatedArticles
    })
  }

  // Calculate statistics
  const activeSnaps = snapProducts.filter(p => p.isActive).length
  const activeOptions = options.filter(o => o.isActive).length
  const activePolicies = policies.filter(p => p.isActive).length
  
  const activeWeddingSnaps = snapProducts.filter(p => p.isActive && !p.id.startsWith('hanbok-')).length
  const activeHanbokSnaps = snapProducts.filter(p => p.isActive && p.id.startsWith('hanbok-')).length
  
  const totalSnapRevenue = snapProducts
    .filter(p => p.isActive)
    .reduce((sum, p) => sum + p.basePrice, 0)

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm md:text-base text-muted-foreground">
          상품, 옵션 및 정책을 관리하고 설정하세요
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
            <CardTitle className="text-sm font-medium">촬영 상품</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSnaps}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>웨딩 {activeWeddingSnaps}</span>
              <span>·</span>
              <span>HANBOK {activeHanbokSnaps}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">추가 옵션</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeOptions}</div>
            <p className="text-xs text-muted-foreground">
              전체 {options.length}개 중 활성
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">활성 정책</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePolicies}</div>
            <p className="text-xs text-muted-foreground">
              전체 {policies.length}개 중 활성
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">기본상품 총액</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSnapRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              본식스냅 기준
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
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
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'snap' | 'options' | 'policies')}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="snap" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
            <Camera className="h-3 w-3 md:h-4 md:w-4" />
            <span>상품관리</span>
            <span className="hidden md:inline">({snapProducts.length})</span>
          </TabsTrigger>
          <TabsTrigger value="options" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
            <Layers className="h-3 w-3 md:h-4 md:w-4" />
            <span>추가옵션</span>
            <span className="hidden md:inline">({options.length})</span>
          </TabsTrigger>
          <TabsTrigger value="policies" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
            <Shield className="h-3 w-3 md:h-4 md:w-4" />
            <span>정책</span>
            <span className="hidden md:inline">({policies.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* Snap Products Tab */}
        <TabsContent value="snap" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              {filteredSnapProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <Camera className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">본식스냅 상품이 없습니다</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {searchTerm ? '검색 결과가 없습니다' : '첫 본식스냅 상품을 만들어보세요'}
                  </p>
                  <Button onClick={handleCreate} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    상품 만들기
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="min-w-[150px]">상품명</TableHead>
                        <TableHead className="min-w-[200px]">설명</TableHead>
                        <TableHead className="text-center">사진 수</TableHead>
                        <TableHead className="text-center">앨범</TableHead>
                        <TableHead className="text-right min-w-[120px]">가격</TableHead>
                        <TableHead className="text-center">상태</TableHead>
                        <TableHead className="text-center">액션</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSnapProducts.map((product) => (
                        <TableRow key={product.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{product.name}</p>
                                {product.id.startsWith('hanbok-') && (
                                  <Badge variant="outline" className="text-xs">
                                    HANBOK
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{product.title}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-[300px]">
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {product.description.slice(0, 2).join(' • ')}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline" className="gap-1">
                              <ImageIcon className="h-3 w-3" />
                              {product.photoCount}장
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            {product.albumIncluded ? (
                              <div className="flex flex-col gap-1 items-center">
                                <Badge variant="secondary">
                                  {product.albumPages}P
                                </Badge>
                                {product.miniAlbums && (
                                  <span className="text-xs text-muted-foreground">
                                    미니 {product.miniAlbums}권
                                  </span>
                                )}
                              </div>
                            ) : (
                              <Badge variant="outline">없음</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            {formatCurrency(product.basePrice)}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant={product.isActive ? 'default' : 'secondary'}>
                              {product.isActive ? '활성' : '비활성'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(product)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Switch
                                checked={product.isActive}
                                onCheckedChange={() => handleToggleStatus(product.id)}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Options Tab */}
        <TabsContent value="options" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              {filteredOptions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <Layers className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">추가 옵션이 없습니다</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {searchTerm ? '검색 결과가 없습니다' : '첫 추가 옵션을 만들어보세요'}
                  </p>
                  <Button onClick={handleCreate} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    옵션 만들기
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="min-w-[150px]">옵션명</TableHead>
                        <TableHead className="min-w-[250px]">설명</TableHead>
                        <TableHead className="text-center">사진 추가</TableHead>
                        <TableHead className="text-right min-w-[120px]">가격</TableHead>
                        <TableHead className="text-center">상태</TableHead>
                        <TableHead className="text-center">액션</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOptions.map((option) => (
                        <TableRow key={option.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div>
                              <p className="font-medium">{option.name}</p>
                              <p className="text-xs text-muted-foreground">{option.title}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm text-muted-foreground">
                              {option.description.join(' • ')}
                            </p>
                          </TableCell>
                          <TableCell className="text-center">
                            {option.photoCount > 0 ? (
                              <Badge variant="outline" className="gap-1">
                                <ImageIcon className="h-3 w-3" />
                                +{option.photoCount}장
                              </Badge>
                            ) : (
                              <Badge variant="outline">-</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            {formatCurrency(option.basePrice)}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant={option.isActive ? 'default' : 'secondary'}>
                              {option.isActive ? '활성' : '비활성'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(option)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Switch
                                checked={option.isActive}
                                onCheckedChange={() => handleToggleStatus(option.id)}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Policies Tab */}
        <TabsContent value="policies" className="space-y-4">
          {/* Contract Card */}
          <Card className="border-blue-200 bg-blue-50/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span className="text-blue-900">{contractTemplate.title}</span>
                    <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-700 border-blue-300">
                      {contractTemplate.version}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-blue-700/80">
                    고객용 계약서 템플릿 (고객 페이지와 동일하게 적용됩니다)
                  </p>
                </div>
                <Button onClick={handleEditContract} variant="outline" className="border-blue-300 hover:bg-blue-100">
                  <Edit className="mr-2 h-4 w-4" />
                  편집
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-blue-600 font-medium mb-1">계약서명</p>
                  <p className="text-blue-900">{contractTemplate.name}</p>
                </div>
                <div>
                  <p className="text-blue-600 font-medium mb-1">시행일</p>
                  <p className="text-blue-900">{contractTemplate.effectiveDate}</p>
                </div>
                <div>
                  <p className="text-blue-600 font-medium mb-1">조항 수</p>
                  <p className="text-blue-900">{contractTemplate.articles.length}개 조항</p>
                </div>
              </div>
              <div className="bg-white border border-blue-200 rounded-lg p-4">
                <p className="text-xs text-blue-600 font-medium mb-2">포함된 조항:</p>
                <div className="flex flex-wrap gap-2">
                  {contractTemplate.articles.map((article) => (
                    <Badge key={article.id} variant="secondary" className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                      {article.title}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-xs text-blue-600 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                이 계약서는 고객용 페이지 (마인드 포털)의 계약서 페이지에 자동으로 적용됩니다
              </div>
            </CardContent>
          </Card>

          {/* Policies Table */}
          <Card>
            <CardContent className="p-0">
              {filteredPolicies.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">정책이 없습니다</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {searchTerm ? '검색 결과가 없습니다' : '첫 정책을 만들어보세요'}
                  </p>
                  <Button onClick={handleCreate} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    정책 만들기
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="min-w-[200px]">정책명</TableHead>
                        <TableHead className="min-w-[100px]">유형</TableHead>
                        <TableHead className="min-w-[80px]">버전</TableHead>
                        <TableHead className="min-w-[120px]">시행일</TableHead>
                        <TableHead className="text-center">상태</TableHead>
                        <TableHead className="text-center">액션</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPolicies.map((policy) => (
                        <TableRow key={policy.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{policy.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {getPolicyTypeLabel(policy.type)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{policy.version}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {policy.effectiveDate}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant={policy.isActive ? 'default' : 'secondary'}>
                              {policy.isActive ? '활성' : '비활성'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(policy)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Switch
                                checked={policy.isActive}
                                onCheckedChange={() => handleToggleStatus(policy.id)}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Drawer for Create/Edit */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {drawerMode === 'create' ? '새로 만들기' : '수정하기'}
            </SheetTitle>
            <SheetDescription>
              {activeTab === 'snap' && '본식스냅 상품 정보를 입력하세요'}
              {activeTab === 'options' && '추가 옵션 정보를 입력하세요'}
              {activeTab === 'policies' && '정책 정보를 입력하세요'}
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 py-4">
            {/* Product/Option Form */}
            {(activeTab === 'snap' || activeTab === 'options') && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">상품/옵션 이름 *</Label>
                  <Input
                    id="name"
                    placeholder="예: new BASIC, Option 1"
                    defaultValue={selectedItem && 'category' in selectedItem ? selectedItem.name : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">표시 제목 *</Label>
                  <Input
                    id="title"
                    placeholder="예: 본식스냅 앨범형 기본상품"
                    defaultValue={selectedItem && 'category' in selectedItem ? selectedItem.title : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">설명 (한 줄당 하나) *</Label>
                  <Textarea
                    id="description"
                    placeholder="1인 작가 진행&#10;최종본 60장&#10;웹갤러리 제공"
                    rows={6}
                    defaultValue={selectedItem && 'category' in selectedItem ? selectedItem.description.join('\n') : ''}
                  />
                  <p className="text-xs text-muted-foreground">
                    각 줄이 하나의 설명 항목으로 표시됩니다
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="photoCount">최종 사진 수</Label>
                    <Input
                      id="photoCount"
                      type="number"
                      placeholder="60"
                      defaultValue={selectedItem && 'category' in selectedItem ? selectedItem.photoCount : 0}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="basePrice">가격 (원) *</Label>
                    <Input
                      id="basePrice"
                      type="number"
                      placeholder="1210000"
                      defaultValue={selectedItem && 'category' in selectedItem ? selectedItem.basePrice : 0}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="albumIncluded">앨범 포함</Label>
                    <Switch
                      id="albumIncluded"
                      defaultChecked={selectedItem && 'category' in selectedItem ? selectedItem.albumIncluded : false}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="albumPages">앨범 페이지 수</Label>
                    <Input
                      id="albumPages"
                      type="number"
                      placeholder="60"
                      defaultValue={selectedItem && 'category' in selectedItem ? selectedItem.albumPages || '' : ''}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="miniAlbums">미니 앨범 수</Label>
                    <Input
                      id="miniAlbums"
                      type="number"
                      placeholder="2"
                      defaultValue={selectedItem && 'category' in selectedItem ? selectedItem.miniAlbums || '' : ''}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>납품 형태</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="webGallery" className="font-normal">웹갤러리 제공</Label>
                      <Switch
                        id="webGallery"
                        defaultChecked={selectedItem && 'category' in selectedItem ? selectedItem.delivery.includesWebGallery : false}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="rawDownload" className="font-normal">전체원본 제공</Label>
                      <Switch
                        id="rawDownload"
                        defaultChecked={selectedItem && 'category' in selectedItem ? selectedItem.delivery.includesRawDownload : false}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Policy Form */}
            {activeTab === 'policies' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="policyName">정책명 *</Label>
                  <Input
                    id="policyName"
                    placeholder="예: 취소 및 환불 규정"
                    defaultValue={selectedItem && 'type' in selectedItem ? selectedItem.name : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="policyVersion">버전 *</Label>
                  <Input
                    id="policyVersion"
                    placeholder="예: v2.1"
                    defaultValue={selectedItem && 'type' in selectedItem ? selectedItem.version : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="policyContent">정책 내용 (Markdown 지원) *</Label>
                  <Textarea
                    id="policyContent"
                    placeholder="## 정책 제목&#10;### 세부 내용"
                    rows={10}
                    defaultValue={selectedItem && 'type' in selectedItem ? selectedItem.content : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="effectiveDate">시행일 *</Label>
                  <Input
                    id="effectiveDate"
                    type="date"
                    defaultValue={selectedItem && 'type' in selectedItem ? selectedItem.effectiveDate : ''}
                  />
                </div>
              </>
            )}
          </div>

          <SheetFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              취소
            </Button>
            <Button onClick={handleSave}>
              {drawerMode === 'create' ? '생성' : '저장'}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Contract Edit Dialog */}
      <Dialog open={contractDialogOpen} onOpenChange={setContractDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              계약서 편집
            </DialogTitle>
            <DialogDescription>
              고객용 페이지의 계약서 내용을 수정합니다. 저장하면 즉시 고객 페이지에 반영됩니다.
            </DialogDescription>
          </DialogHeader>

          {editingContract && (
            <div className="space-y-6 py-4">
              {/* Contract Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contractTitle">계약서 제목</Label>
                  <Input
                    id="contractTitle"
                    value={editingContract.title}
                    onChange={(e) => setEditingContract({...editingContract, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractVersion">버전</Label>
                  <Input
                    id="contractVersion"
                    value={editingContract.version}
                    onChange={(e) => setEditingContract({...editingContract, version: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contractDescription">계약서 설명</Label>
                <Textarea
                  id="contractDescription"
                  value={editingContract.description}
                  onChange={(e) => setEditingContract({...editingContract, description: e.target.value})}
                  rows={2}
                />
              </div>

              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  계약서 조항
                </h3>
                <div className="space-y-6">
                  {editingContract.articles.map((article) => (
                    <Card key={article.id} className="border-zinc-200">
                      <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`article-title-${article.id}`}>
                            {article.order}번 조항 제목
                          </Label>
                          <Input
                            id={`article-title-${article.id}`}
                            value={article.title}
                            onChange={(e) => handleUpdateContractArticle(article.id, 'title', e.target.value)}
                            placeholder="예: 제1조 (계약 당사자)"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`article-content-${article.id}`}>
                            조항 내용 (한 줄당 하나의 항목)
                          </Label>
                          <Textarea
                            id={`article-content-${article.id}`}
                            value={article.content.join('\n')}
                            onChange={(e) => handleUpdateContractArticle(article.id, 'content', e.target.value.split('\n'))}
                            rows={Math.max(4, article.content.length)}
                            placeholder="① 첫 번째 항목&#10;② 두 번째 항목&#10;※ 비고 사항"
                            className="font-mono text-sm"
                          />
                          <p className="text-xs text-muted-foreground">
                            💡 변수 사용 가능: {'{weddingDate}, {weddingTime}, {venue}, {packageName}, {totalAmount}, {depositAmount}, {balanceAmount}, {contractDate}'}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contractFooter">하단 문구</Label>
                  <Input
                    id="contractFooter"
                    value={editingContract.footer}
                    onChange={(e) => setEditingContract({...editingContract, footer: e.target.value})}
                    placeholder="계약 체결일: {contractDate}"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractNotice">중요 안내</Label>
                  <Textarea
                    id="contractNotice"
                    value={editingContract.importantNotice}
                    onChange={(e) => setEditingContract({...editingContract, importantNotice: e.target.value})}
                    rows={3}
                    placeholder="본 계약서의 법적 효력 및 주의사항"
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setContractDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleSaveContract} className="bg-blue-600 hover:bg-blue-700">
              <CheckCircle className="mr-2 h-4 w-4" />
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
