'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { mockPhotographers } from '@/lib/mock/schedules'
import {
  User,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  Search,
  Calendar,
  Star
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface AssignPhotographerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAssignPhotographer: (photographerId: string, photographerName: string) => void
  currentPhotographerId?: string
  projectName?: string
  weddingDate?: string
}

export function AssignPhotographerDialog({
  open,
  onOpenChange,
  onAssignPhotographer,
  currentPhotographerId,
  projectName,
  weddingDate
}: AssignPhotographerDialogProps) {
  const [photographerSearch, setPhotographerSearch] = useState('')
  const [selectedPhotographerId, setSelectedPhotographerId] = useState(currentPhotographerId || '')

  const handleAssign = () => {
    if (!selectedPhotographerId) {
      toast.error('사진작가를 선택해주세요')
      return
    }

    const photographer = mockPhotographers.find(p => p.id === selectedPhotographerId)
    if (photographer) {
      onAssignPhotographer(photographer.id, photographer.name)
      toast.success(`${photographer.name} 작가가 배정되었습니다`)
      onOpenChange(false)
    }
  }

  const filteredPhotographers = mockPhotographers.filter(p =>
    p.name.toLowerCase().includes(photographerSearch.toLowerCase())
  )

  const getPhotographerAvailability = (photographerId: string) => {
    // TODO: Check photographer availability for wedding date
    // For now, return random availability
    const random = Math.random()
    if (random > 0.7) return 'busy'
    return 'available'
  }

  const getPhotographerStats = (photographerId: string) => {
    // Mock stats - in real app, fetch from backend
    return {
      completedProjects: Math.floor(Math.random() * 50) + 10,
      rating: (4.5 + Math.random() * 0.5).toFixed(1)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            사진작가 배정
          </DialogTitle>
          <DialogDescription>
            {projectName && (
              <div className="mt-2 space-y-1">
                <div className="font-semibold text-foreground">{projectName}</div>
                {weddingDate && (
                  <div className="flex items-center gap-2 text-xs">
                    <Calendar className="h-3 w-3" />
                    {weddingDate}
                  </div>
                )}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="작가명으로 검색..."
              value={photographerSearch}
              onChange={(e) => setPhotographerSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Current Assignment */}
          {currentPhotographerId && (
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="text-sm font-medium text-blue-900 mb-2">현재 배정된 작가</div>
              <div className="flex items-center gap-3">
                <Avatar className="bg-blue-600">
                  <AvatarFallback className="bg-blue-600 text-white">
                    {mockPhotographers.find(p => p.id === currentPhotographerId)?.name.charAt(0) || '?'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">
                    {mockPhotographers.find(p => p.id === currentPhotographerId)?.name || '알 수 없음'}
                  </div>
                  <div className="text-xs text-muted-foreground">현재 담당 작가</div>
                </div>
              </div>
            </div>
          )}

          {/* Photographer List */}
          <div className="space-y-2 max-h-[450px] overflow-y-auto">
            <div className="text-sm font-medium mb-2">작가 목록 ({filteredPhotographers.length}명)</div>
            
            {filteredPhotographers.map((photographer) => {
              const availability = getPhotographerAvailability(photographer.id)
              const stats = getPhotographerStats(photographer.id)
              const isSelected = selectedPhotographerId === photographer.id
              const isCurrent = currentPhotographerId === photographer.id

              return (
                <button
                  key={photographer.id}
                  type="button"
                  onClick={() => setSelectedPhotographerId(photographer.id)}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 transition-all text-left",
                    isSelected
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className={cn(
                      isSelected ? "bg-blue-600" : "bg-gray-600"
                    )}>
                      <AvatarFallback className={cn(
                        "text-white",
                        isSelected ? "bg-blue-600" : "bg-gray-600"
                      )}>
                        {photographer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{photographer.name}</span>
                        {isCurrent && (
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                            현재 배정
                          </Badge>
                        )}
                        {availability === 'available' && !isCurrent && (
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            가능
                          </Badge>
                        )}
                        {availability === 'busy' && (
                          <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            바쁨
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-2">
                        사진작가
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{stats.completedProjects}건 완료</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{stats.rating}</span>
                        </div>
                      </div>

                    </div>
                    
                    {isSelected && (
                      <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    )}
                  </div>
                </button>
              )
            })}

            {filteredPhotographers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>검색 결과가 없습니다</p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            취소
          </Button>
          <Button
            onClick={handleAssign}
            disabled={!selectedPhotographerId}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            배정하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

