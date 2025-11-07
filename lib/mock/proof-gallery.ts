export interface ProofPhoto {
  id: string
  url: string
  thumbnail: string
  category: 'ceremony' | 'makeup' | 'outdoor' | 'family' | 'couple'
  selected: boolean
  comments: ProofComment[]
  tags: string[]
}

export interface ProofComment {
  id: string
  type: 'skin' | 'exposure' | 'trim' | 'general'
  text: string
  createdAt: string
}

export type CommentType = 'skin' | 'exposure' | 'trim' | 'general'

export const commentTypeLabels: Record<CommentType, string> = {
  skin: '피부 보정',
  exposure: '노출 조정',
  trim: '트리밍',
  general: '일반'
}

// Generate mock photos (450 photos as mentioned in client data)
export const generateMockProofPhotos = (count: number = 450): ProofPhoto[] => {
  const categories: ProofPhoto['category'][] = ['ceremony', 'makeup', 'outdoor', 'family', 'couple']
  const photos: ProofPhoto[] = []

  for (let i = 1; i <= count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    photos.push({
      id: `photo-${i}`,
      // Using placeholder images (in real app, these would be actual photo URLs)
      url: `https://picsum.photos/seed/${i}/1200/800`,
      thumbnail: `https://picsum.photos/seed/${i}/400/300`,
      category,
      selected: false,
      comments: [],
      tags: []
    })
  }

  return photos
}

// Mock selected photos for demo
export const mockProofGallery = {
  photos: generateMockProofPhotos(450),
  maxSelections: 50,
  selectedCount: 35, // As per client data
}

// Helper: Get category label
export const getCategoryLabel = (category: ProofPhoto['category']): string => {
  const labels = {
    ceremony: '본식',
    makeup: '메이크업',
    outdoor: '야외',
    family: '가족',
    couple: '커플'
  }
  return labels[category]
}

// Helper: Get category color
export const getCategoryColor = (category: ProofPhoto['category']): string => {
  const colors = {
    ceremony: 'bg-blue-100 text-blue-800',
    makeup: 'bg-pink-100 text-pink-800',
    outdoor: 'bg-green-100 text-green-800',
    family: 'bg-purple-100 text-purple-800',
    couple: 'bg-red-100 text-red-800'
  }
  return colors[category]
}

// Helper: Check if can select more
export const canSelectMore = (selectedCount: number, maxSelections: number): boolean => {
  return selectedCount < maxSelections
}

// Helper: Get selection progress percentage
export const getSelectionProgress = (selectedCount: number, maxSelections: number): number => {
  return Math.round((selectedCount / maxSelections) * 100)
}

