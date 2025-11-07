import { z } from 'zod'

// Phone number regex (Korean format)
const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/

// URL regex (optional http/https)
const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/

export const clientInfoSchema = z.object({
  // Step 1: Couple Information
  groomName: z.string().min(2, '신랑 이름을 입력해주세요').max(50),
  groomPhone: z.string().regex(phoneRegex, '올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)'),
  groomEmail: z.string().email('올바른 이메일 형식이 아닙니다').optional().or(z.literal('')),
  
  brideName: z.string().min(2, '신부 이름을 입력해주세요').max(50),
  bridePhone: z.string().regex(phoneRegex, '올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)'),
  brideEmail: z.string().email('올바른 이메일 형식이 아닙니다').optional().or(z.literal('')),
  
  // Step 2: Venue Information
  venueName: z.string().min(2, '예식장 이름을 입력해주세요').max(100),
  venueAddress: z.string().min(5, '예식장 주소를 입력해주세요').max(200),
  venuePhone: z.string().regex(phoneRegex, '올바른 전화번호 형식이 아닙니다').optional().or(z.literal('')),
  venueUrl: z.string().regex(urlRegex, '올바른 URL 형식이 아닙니다').optional().or(z.literal('')),
  ballroom: z.string().min(1, '볼룸을 입력해주세요').max(100),
  
  // Step 3: Makeup Information
  makeupType: z.enum(['in-house', 'external', 'none'], {
    message: '메이크업 유형을 선택해주세요'
  }),
  makeupLocation: z.string().max(200).optional().or(z.literal('')),
  makeupNotes: z.string().max(500).optional().or(z.literal('')),
  
  // Step 4: Delivery Information
  deliveryName: z.string().min(2, '수령인 이름을 입력해주세요').max(50),
  deliveryPhone: z.string().regex(phoneRegex, '올바른 전화번호 형식이 아닙니다'),
  deliveryAddress: z.string().min(5, '배송 주소를 입력해주세요').max(200),
  deliveryAddressDetail: z.string().max(100).optional().or(z.literal('')),
  deliveryPostalCode: z.string().max(10).optional().or(z.literal('')),
  deliveryNotes: z.string().max(500).optional().or(z.literal('')),
})

export type ClientInfoFormData = z.infer<typeof clientInfoSchema>

// Default values
export const defaultClientInfoValues: Partial<ClientInfoFormData> = {
  groomName: '',
  groomPhone: '',
  groomEmail: '',
  brideName: '',
  bridePhone: '',
  brideEmail: '',
  venueName: '',
  venueAddress: '',
  venuePhone: '',
  venueUrl: '',
  ballroom: '',
  makeupType: undefined,
  makeupLocation: '',
  makeupNotes: '',
  deliveryName: '',
  deliveryPhone: '',
  deliveryAddress: '',
  deliveryAddressDetail: '',
  deliveryPostalCode: '',
  deliveryNotes: '',
}

// Step schemas for partial validation
export const step1Schema = clientInfoSchema.pick({
  groomName: true,
  groomPhone: true,
  groomEmail: true,
  brideName: true,
  bridePhone: true,
  brideEmail: true,
})

export const step2Schema = clientInfoSchema.pick({
  venueName: true,
  venueAddress: true,
  venuePhone: true,
  venueUrl: true,
  ballroom: true,
})

export const step3Schema = clientInfoSchema.pick({
  makeupType: true,
  makeupLocation: true,
  makeupNotes: true,
})

export const step4Schema = clientInfoSchema.pick({
  deliveryName: true,
  deliveryPhone: true,
  deliveryAddress: true,
  deliveryAddressDetail: true,
  deliveryPostalCode: true,
  deliveryNotes: true,
})

export const stepSchemas = [step1Schema, step2Schema, step3Schema, step4Schema]

