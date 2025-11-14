/**
 * Mock data for communication board
 * 소통 게시판을 위한 Mock 데이터
 */

import { addDays, subDays, format } from 'date-fns'

export type PostCategory = 
  | 'notice'        // 공지사항
  | 'general'       // 자유게시판
  | 'question'      // 질문
  | 'tips'          // 팁/노하우
  | 'event'         // 이벤트

export interface Post {
  id: string
  category: PostCategory
  title: string
  content: string
  authorId: string
  authorName: string
  authorRole: 'admin' | 'photographer'
  isPinned: boolean      // 상단 고정
  viewCount: number
  commentCount: number
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: string
  postId: string
  content: string
  authorId: string
  authorName: string
  authorRole: 'admin' | 'photographer'
  createdAt: string
  updatedAt: string
}

const today = new Date()

export const mockPosts: Post[] = [
  // Pinned notices
  {
    id: 'post-1',
    category: 'notice',
    title: '[필독] 2025년 상반기 촬영 일정 안내',
    content: `안녕하세요, MindGraphy 관리팀입니다.

2025년 상반기 촬영 일정에 대해 안내드립니다.

📅 피크 시즌: 4월~6월
- 이 기간에는 주말 촬영이 집중될 예정입니다.
- 사전 장비 점검 및 준비를 철저히 해주세요.

🎯 주요 변경사항:
1. 드론 촬영 추가 요청 증가 → 드론 라이센스 필수
2. 당일 편집 서비스 확대 → 편집 장비 업그레이드 완료
3. 해외 출장 촬영 문의 증가 → 별도 협의 필요

📋 준비사항:
- 장비 점검: 매월 첫째주 월요일
- 교육 일정: 분기별 1회 (다음 교육 3월 첫째주)
- 건강 검진: 2월 중 실시

궁금하신 사항은 언제든 문의해주세요.
감사합니다.`,
    authorId: 'admin-1',
    authorName: '김관리자',
    authorRole: 'admin',
    isPinned: true,
    viewCount: 245,
    commentCount: 8,
    createdAt: format(subDays(today, 7), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(today, 7), 'yyyy-MM-dd HH:mm:ss'),
  },
  {
    id: 'post-2',
    category: 'notice',
    title: '[공지] 신규 촬영 장비 도입 안내',
    content: `팀원 여러분께 신규 장비 도입 소식을 전해드립니다.

📸 도입 장비:
1. Sony α7R V 카메라 2대
2. FE 24-70mm f/2.8 GM II 렌즈 2개
3. DJI Mavic 3 Pro 드론 1대
4. Godox AD600 Pro 플래시 4개

📅 수령 일정: 이번 주 금요일
📍 장소: 본사 장비실

💡 장비 교육:
- 일시: 다음 주 월요일 오후 2시
- 장소: 본사 스튜디오
- 필참 대상: 전체 작가

장비 사용법 및 관리 방법에 대해 상세히 설명드릴 예정이니 꼭 참석 부탁드립니다.`,
    authorId: 'admin-1',
    authorName: '김관리자',
    authorRole: 'admin',
    isPinned: true,
    viewCount: 189,
    commentCount: 12,
    createdAt: format(subDays(today, 3), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(today, 3), 'yyyy-MM-dd HH:mm:ss'),
  },
  
  // Recent posts
  {
    id: 'post-3',
    category: 'tips',
    title: '야외 촬영 시 자연광 활용 팁',
    content: `안녕하세요! 오늘은 야외 촬영 시 자연광을 효과적으로 활용하는 방법을 공유합니다.

☀️ 골든 아워 활용:
일출 후 1시간, 일몰 전 1시간이 가장 좋은 조명입니다.
부드럽고 따뜻한 빛으로 인물 촬영에 최적입니다.

☁️ 흐린 날의 장점:
구름이 자연스러운 소프트박스 역할을 합니다.
균일한 조명으로 편집이 쉬워집니다.

💡 반사판 활용:
그림자가 너무 진할 때는 반사판으로 보조광을 만들어주세요.
은색은 밝게, 금색은 따뜻하게 연출됩니다.

도움이 되셨으면 좋겠습니다!`,
    authorId: 'photo-1',
    authorName: '박작가',
    authorRole: 'photographer',
    isPinned: false,
    viewCount: 78,
    commentCount: 5,
    createdAt: format(subDays(today, 1), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(today, 1), 'yyyy-MM-dd HH:mm:ss'),
  },
  {
    id: 'post-4',
    category: 'question',
    title: '드론 촬영 시 허가 관련 질문입니다',
    content: `다음 주 제주도 출장 촬영이 예정되어 있는데요,
해변에서 드론 촬영을 하려고 합니다.

특별히 사전에 허가받아야 하는 사항이 있을까요?
또 비행 제한 구역은 어떻게 확인하나요?

경험 있으신 분들의 조언 부탁드립니다!`,
    authorId: 'photo-3',
    authorName: '이작가',
    authorRole: 'photographer',
    isPinned: false,
    viewCount: 45,
    commentCount: 3,
    createdAt: format(subDays(today, 1), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(today, 1), 'yyyy-MM-dd HH:mm:ss'),
  },
  {
    id: 'post-5',
    category: 'general',
    title: '지난 주말 촬영 후기',
    content: `지난 주말 강원도 펜션에서 촬영했습니다!

날씨가 정말 좋아서 야외 촬영을 많이 할 수 있었어요.
신랑신부분들도 너무 만족해하셔서 보람찼습니다 😊

특히 석양 무렵 촬영한 사진들이 정말 예뻐서
편집하는 내내 즐거웠습니다.

다들 이번 주도 화이팅입니다!`,
    authorId: 'photo-2',
    authorName: '최작가',
    authorRole: 'photographer',
    isPinned: false,
    viewCount: 92,
    commentCount: 7,
    createdAt: format(subDays(today, 2), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(today, 2), 'yyyy-MM-dd HH:mm:ss'),
  },
  {
    id: 'post-6',
    category: 'event',
    title: '🎉 3월 MVP 작가 선정 및 시상',
    content: `3월 한 달간 최고의 성과를 보여주신 MVP 작가를 발표합니다!

🏆 3월 MVP: 박작가님

선정 이유:
- 고객 만족도 평점 4.9/5.0
- 촬영 건수 15건 (팀 내 1위)
- 당일 편집 서비스로 고객 감동 제공
- 신규 고객 2건 직접 유치

시상 내역:
- 상금 100만원
- 다음 달 우선 일정 선택권
- 신규 장비 우선 사용권

축하드립니다! 👏👏👏`,
    authorId: 'admin-1',
    authorName: '김관리자',
    authorRole: 'admin',
    isPinned: false,
    viewCount: 156,
    commentCount: 11,
    createdAt: format(subDays(today, 3), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(today, 3), 'yyyy-MM-dd HH:mm:ss'),
  },
  {
    id: 'post-7',
    category: 'tips',
    title: '실내 촬영 시 조명 세팅 가이드',
    content: `실내 촬영할 때 조명 세팅하는 방법 공유합니다.

🔆 기본 3점 조명:
1. 주광(Key Light): 45도 각도에서
2. 보조광(Fill Light): 반대편에서 약하게
3. 역광(Back Light): 피사체 뒤에서 윤곽 강조

💡 플래시 설정:
- 주광: 전체 출력의 70-80%
- 보조광: 30-40%
- 역광: 50-60%

📸 추천 세팅:
- ISO: 200-400
- 조리개: f/2.8-f/4
- 셔터스피드: 1/125-1/200

질문 있으시면 댓글 남겨주세요!`,
    authorId: 'photo-1',
    authorName: '박작가',
    authorRole: 'photographer',
    isPinned: false,
    viewCount: 67,
    commentCount: 4,
    createdAt: format(subDays(today, 4), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(today, 4), 'yyyy-MM-dd HH:mm:ss'),
  },
  {
    id: 'post-8',
    category: 'general',
    title: '이번 주 스터디 모임 안내',
    content: `매주 수요일 저녁 8시에 진행되는 사진 스터디 모임 안내입니다.

📅 일시: 이번 주 수요일 오후 8시
📍 장소: 본사 회의실 (온라인 병행)
📚 주제: 리터칭 기법 - 피부 톤 보정

관심 있으신 분들은 댓글로 참석 의사 남겨주세요!
온라인 참석도 가능합니다.`,
    authorId: 'photo-3',
    authorName: '이작가',
    authorRole: 'photographer',
    isPinned: false,
    viewCount: 54,
    commentCount: 6,
    createdAt: format(subDays(today, 5), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(today, 5), 'yyyy-MM-dd HH:mm:ss'),
  },
]

export const mockComments: Comment[] = [
  // Comments for post-1 (공지사항)
  {
    id: 'comment-1',
    postId: 'post-1',
    content: '일정 공유 감사합니다! 드론 라이센스 언제까지 취득해야 하나요?',
    authorId: 'photo-2',
    authorName: '최작가',
    authorRole: 'photographer',
    createdAt: format(subDays(today, 6), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(today, 6), 'yyyy-MM-dd HH:mm:ss'),
  },
  {
    id: 'comment-2',
    postId: 'post-1',
    content: '3월 말까지 취득 완료 부탁드립니다. 교육비는 회사에서 지원합니다.',
    authorId: 'admin-1',
    authorName: '김관리자',
    authorRole: 'admin',
    createdAt: format(subDays(today, 6), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(today, 6), 'yyyy-MM-dd HH:mm:ss'),
  },
  
  // Comments for post-3 (팁)
  {
    id: 'comment-3',
    postId: 'post-3',
    content: '좋은 팁 감사합니다! 반사판 각도도 중요한 것 같아요.',
    authorId: 'photo-3',
    authorName: '이작가',
    authorRole: 'photographer',
    createdAt: format(subDays(today, 1), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(today, 1), 'yyyy-MM-dd HH:mm:ss'),
  },
  {
    id: 'comment-4',
    postId: 'post-3',
    content: '맞아요! 45도 정도 각도로 사용하면 자연스럽게 나옵니다 👍',
    authorId: 'photo-1',
    authorName: '박작가',
    authorRole: 'photographer',
    createdAt: format(subDays(today, 1), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(today, 1), 'yyyy-MM-dd HH:mm:ss'),
  },
  
  // Comments for post-4 (질문)
  {
    id: 'comment-5',
    postId: 'post-4',
    content: '제주도는 일부 지역이 비행 제한 구역입니다. 국토부 드론원스톱 앱에서 확인 가능해요!',
    authorId: 'photo-1',
    authorName: '박작가',
    authorRole: 'photographer',
    createdAt: format(subDays(today, 1), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(today, 1), 'yyyy-MM-dd HH:mm:ss'),
  },
  {
    id: 'comment-6',
    postId: 'post-4',
    content: '해변 촬영은 대부분 가능하지만, 공항 근처는 피하세요. 혹시 모르니 지자체에 사전 연락하는 것도 좋습니다.',
    authorId: 'admin-1',
    authorName: '김관리자',
    authorRole: 'admin',
    createdAt: format(subDays(today, 1), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(today, 1), 'yyyy-MM-dd HH:mm:ss'),
  },
  
  // Comments for post-5 (후기)
  {
    id: 'comment-7',
    postId: 'post-5',
    content: '수고하셨어요! 강원도 촬영 정말 멋질 것 같네요 😊',
    authorId: 'photo-1',
    authorName: '박작가',
    authorRole: 'photographer',
    createdAt: format(subDays(today, 2), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(today, 2), 'yyyy-MM-dd HH:mm:ss'),
  },
  {
    id: 'comment-8',
    postId: 'post-5',
    content: '고생 많으셨습니다! 편집본 나오면 팀 내 공유 부탁드려요~',
    authorId: 'admin-1',
    authorName: '김관리자',
    authorRole: 'admin',
    createdAt: format(subDays(today, 2), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(today, 2), 'yyyy-MM-dd HH:mm:ss'),
  },
]

// Helper functions
export function getPostsByCategory(category: PostCategory): Post[] {
  return mockPosts.filter(post => post.category === category)
}

export function getPinnedPosts(): Post[] {
  return mockPosts.filter(post => post.isPinned).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function getRecentPosts(limit: number = 10): Post[] {
  return [...mockPosts]
    .filter(post => !post.isPinned)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}

export function getCommentsByPostId(postId: string): Comment[] {
  return mockComments
    .filter(comment => comment.postId === postId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
}

export function searchPosts(query: string): Post[] {
  const lowerQuery = query.toLowerCase()
  return mockPosts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.content.toLowerCase().includes(lowerQuery) ||
    post.authorName.toLowerCase().includes(lowerQuery)
  )
}

