import type { ProjectDetail } from '@/lib/types/project-detail'

// 권유은 아기 돌잔치 프로젝트 상세 정보
export const mockProjectDetails: Record<string, ProjectDetail> = {
  'project-baby-kwon': {
    id: 'project-baby-kwon',
    projectNumber: 'PRJ-2025-104',
    title: 'mind_BABY [종학.하은] 권유은 아기 / (안국) 파티나',
    
    backup: {
      primary: 'WORK_',
      secondary: 'DATA_00',
      tertiary: 'BACK_00',
      deliveryStartDate: undefined
    },
    
    shootingData: {
      mainPhotographer: 'OOO',
      subPhotographer: 'OOO',
      totalFiles: 0,
      totalSize: undefined
    },
    
    progressTimeline: [
      {
        date: '2025-03-30',
        year: 2025,
        description: '계약 완료',
        completed: true
      },
      {
        date: '2025-11-01',
        year: 2025,
        description: '잔금 입금 예정',
        completed: false
      },
      {
        date: '2025-11-08',
        year: 2025,
        description: '촬영 예정',
        completed: false
      }
    ],
    
    product: {
      type: '돌잔치 행사',
      team: ['작가', '작가'],
      description: '돌잔치 행사 촬영',
      album: {
        size: '13x10인치',
        pages: 50,
        quantity: 1
      },
      frame: {
        size: '14x14인치',
        quantity: 1
      },
      finalPhotos: {
        count: 50,
        selectionType: '고객셀렉',
        retouching: true
      },
      originalPhotos: true
    },
    
    client: {
      father: {
        name: '권용국',
        phone: '010-2010-9616',
        email: 'zugu2379@gmail.com'
      },
      mother: {
        name: '공기윤',
        phone: '010-9132-3065',
        email: 'kykong0403@gmail.com'
      },
      baby: {
        name: '권유은',
        gender: '여아'
      }
    },
    
    delivery: {
      recipient: '공기윤',
      phone: '010-9132-3065',
      address: '서울 용산구 원효로 40(강변삼성스위트), 103-1401호',
      postalCode: undefined
    },
    
    schedule: {
      date: '2025-11-08',
      time: '12:00',
      venue: {
        name: '안국역 파티나',
        address: '서울 종로구 율곡로 83 4층',
        phone: '010-4219-2935',
        url: 'https://naver.me/53lmshDs'
      }
    },
    
    specialNotes: {
      contractDate: '2025-03-30',
      contractPerson: '엄마',
      source: '워크인',
      reason: '아 저희 22년도에 마인드그라피에서 웨딩한복스냅 찍었었어요ㅎㅎ 그때 기억이 좋아서 아기돌기념 한복스냅이랑 돌잔치스냅도 같이 하려구요!',
      venueConfirmed: true,
      arrivalTime: undefined,
      finishTime: undefined
    },
    
    photographerNotes: undefined,
    postShootingNotes: undefined,
    
    payment: {
      totalAmount: 660000,
      deposit: {
        amount: 150000,
        note: '계약금 입금과 동시에 예약이 확정됩니다'
      },
      balance: {
        amount: 510000,
        dueDate: '2025-11-01',
        note: '촬영 진행 7일 전인 25년 11월 1일까지 입금 부탁드립니다',
        paid: true,
        paidDate: '2025-03-30',
        receiptUrl: 'https://cashbill-live.appspot.com/bill/3527000511-20250331-0003'
      },
      bankAccount: {
        bank: '기업은행',
        account: '132-114580-04-016',
        holder: '신영민'
      }
    },
    
    links: {
      downloadLink: undefined,
      galleryLink: {
        url: 'http://mind-gallery.com/',
        password: undefined,
        note: '고객셀렉 완료시 까지 링크가 유지 됩니다'
      },
      revisionRequests: undefined
    },
    
    createdBy: 'drcoolbrain@gmail.com',
    createdAt: '2025-03-30T00:00:00Z',
    updatedAt: '2025-03-30T00:00:00Z'
  }
}

export function getProjectDetail(id: string): ProjectDetail | null {
  return mockProjectDetails[id] || null
}

