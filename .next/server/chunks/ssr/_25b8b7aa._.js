module.exports=[5522,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(97895);let e=c.forwardRef(({className:a,type:c,...e},f)=>(0,b.jsx)("input",{type:c,className:(0,d.cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",a),ref:f,...e}));e.displayName="Input",a.s(["Input",()=>e])},87532,a=>{"use strict";let b=(0,a.i(70106).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);a.s(["Search",()=>b],87532)},15618,a=>{"use strict";let b=(0,a.i(70106).default)("plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);a.s(["Plus",()=>b],15618)},16201,a=>{"use strict";let b=(0,a.i(70106).default)("circle-check-big",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);a.s(["CheckCircle",()=>b],16201)},24569,a=>{"use strict";let b=(0,a.i(70106).default)("square-pen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]);a.s(["Edit",()=>b],24569)},21958,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(7554),e=a.i(50104),f=a.i(24050),g=a.i(77192),h=a.i(30553),i=a.i(7827),j=a.i(25152),k=a.i(92843),l="Tabs",[m,n]=(0,e.createContextScope)(l,[f.createRovingFocusGroupScope]),o=(0,f.createRovingFocusGroupScope)(),[p,q]=m(l),r=c.forwardRef((a,c)=>{let{__scopeTabs:d,value:e,onValueChange:f,defaultValue:g,orientation:m="horizontal",dir:n,activationMode:o="automatic",...q}=a,r=(0,i.useDirection)(n),[s,t]=(0,j.useControllableState)({prop:e,onChange:f,defaultProp:g??"",caller:l});return(0,b.jsx)(p,{scope:d,baseId:(0,k.useId)(),value:s,onValueChange:t,orientation:m,dir:r,activationMode:o,children:(0,b.jsx)(h.Primitive.div,{dir:r,"data-orientation":m,...q,ref:c})})});r.displayName=l;var s="TabsList",t=c.forwardRef((a,c)=>{let{__scopeTabs:d,loop:e=!0,...g}=a,i=q(s,d),j=o(d);return(0,b.jsx)(f.Root,{asChild:!0,...j,orientation:i.orientation,dir:i.dir,loop:e,children:(0,b.jsx)(h.Primitive.div,{role:"tablist","aria-orientation":i.orientation,...g,ref:c})})});t.displayName=s;var u="TabsTrigger",v=c.forwardRef((a,c)=>{let{__scopeTabs:e,value:g,disabled:i=!1,...j}=a,k=q(u,e),l=o(e),m=y(k.baseId,g),n=z(k.baseId,g),p=g===k.value;return(0,b.jsx)(f.Item,{asChild:!0,...l,focusable:!i,active:p,children:(0,b.jsx)(h.Primitive.button,{type:"button",role:"tab","aria-selected":p,"aria-controls":n,"data-state":p?"active":"inactive","data-disabled":i?"":void 0,disabled:i,id:m,...j,ref:c,onMouseDown:(0,d.composeEventHandlers)(a.onMouseDown,a=>{i||0!==a.button||!1!==a.ctrlKey?a.preventDefault():k.onValueChange(g)}),onKeyDown:(0,d.composeEventHandlers)(a.onKeyDown,a=>{[" ","Enter"].includes(a.key)&&k.onValueChange(g)}),onFocus:(0,d.composeEventHandlers)(a.onFocus,()=>{let a="manual"!==k.activationMode;p||i||!a||k.onValueChange(g)})})})});v.displayName=u;var w="TabsContent",x=c.forwardRef((a,d)=>{let{__scopeTabs:e,value:f,forceMount:i,children:j,...k}=a,l=q(w,e),m=y(l.baseId,f),n=z(l.baseId,f),o=f===l.value,p=c.useRef(o);return c.useEffect(()=>{let a=requestAnimationFrame(()=>p.current=!1);return()=>cancelAnimationFrame(a)},[]),(0,b.jsx)(g.Presence,{present:i||o,children:({present:c})=>(0,b.jsx)(h.Primitive.div,{"data-state":o?"active":"inactive","data-orientation":l.orientation,role:"tabpanel","aria-labelledby":m,hidden:!c,id:n,tabIndex:0,...k,ref:d,style:{...a.style,animationDuration:p.current?"0s":void 0},children:c&&j})})});function y(a,b){return`${a}-trigger-${b}`}function z(a,b){return`${a}-content-${b}`}x.displayName=w;var A=a.i(97895);let B=c.forwardRef(({className:a,...c},d)=>(0,b.jsx)(t,{ref:d,className:(0,A.cn)("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",a),...c}));B.displayName=t.displayName;let C=c.forwardRef(({className:a,...c},d)=>(0,b.jsx)(v,{ref:d,className:(0,A.cn)("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",a),...c}));C.displayName=v.displayName;let D=c.forwardRef(({className:a,...c},d)=>(0,b.jsx)(x,{ref:d,className:(0,A.cn)("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",a),...c}));D.displayName=x.displayName,a.s(["Tabs",()=>r,"TabsContent",()=>D,"TabsList",()=>B,"TabsTrigger",()=>C],21958)},62722,a=>{"use strict";let b=(0,a.i(70106).default)("circle-x",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);a.s(["XCircle",()=>b],62722)},88237,34846,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(97895);let e=c.forwardRef(({className:a,...c},e)=>(0,b.jsx)("div",{className:"relative w-full overflow-auto",children:(0,b.jsx)("table",{ref:e,className:(0,d.cn)("w-full caption-bottom text-sm",a),...c})}));e.displayName="Table";let f=c.forwardRef(({className:a,...c},e)=>(0,b.jsx)("thead",{ref:e,className:(0,d.cn)("[&_tr]:border-b",a),...c}));f.displayName="TableHeader";let g=c.forwardRef(({className:a,...c},e)=>(0,b.jsx)("tbody",{ref:e,className:(0,d.cn)("[&_tr:last-child]:border-0",a),...c}));g.displayName="TableBody",c.forwardRef(({className:a,...c},e)=>(0,b.jsx)("tfoot",{ref:e,className:(0,d.cn)("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",a),...c})).displayName="TableFooter";let h=c.forwardRef(({className:a,...c},e)=>(0,b.jsx)("tr",{ref:e,className:(0,d.cn)("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",a),...c}));h.displayName="TableRow";let i=c.forwardRef(({className:a,...c},e)=>(0,b.jsx)("th",{ref:e,className:(0,d.cn)("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",a),...c}));i.displayName="TableHead";let j=c.forwardRef(({className:a,...c},e)=>(0,b.jsx)("td",{ref:e,className:(0,d.cn)("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",a),...c}));j.displayName="TableCell",c.forwardRef(({className:a,...c},e)=>(0,b.jsx)("caption",{ref:e,className:(0,d.cn)("mt-4 text-sm text-muted-foreground",a),...c})).displayName="TableCaption",a.s(["Table",()=>e,"TableBody",()=>g,"TableCell",()=>j,"TableHead",()=>i,"TableHeader",()=>f,"TableRow",()=>h],88237);let k=[{id:"policy-001",name:"취소 및 환불 규정",type:"cancellation",version:"v2.1",content:`## 취소 및 환불 규정

### 1. 계약 취소
- 촬영 30일 전: 100% 환불
- 촬영 14~29일 전: 50% 환불
- 촬영 7~13일 전: 30% 환불
- 촬영 6일 전 이내: 환불 불가

### 2. 당사 사유로 인한 취소
- 100% 전액 환불 또는 일정 재조정

### 3. 불가항력 (천재지변 등)
- 일정 재조정 우선, 불가능시 전액 환불

### 4. 부분 환불
- 옵션 취소: 옵션 금액의 50%
- 앨범 취소 (촬영 후): 환불 불가`,effectiveDate:"2024-10-01",isActive:!0,createdAt:"2024-09-15"},{id:"policy-002",name:"개인정보 처리방침",type:"privacy",version:"v3.0",content:`## 개인정보 처리방침

### 1. 수집하는 개인정보
- 이름, 연락처, 이메일, 주소
- 촬영 정보 (일시, 장소)
- 사진 및 영상 (초상권 포함)

### 2. 개인정보의 이용 목적
- 촬영 서비스 제공
- 계약 이행 및 정산
- 결과물 배송
- 마케팅 (동의시)

### 3. 개인정보 보유 기간
- 계약 종료 후 5년
- 법령에서 정한 기간

### 4. 개인정보 제3자 제공
- 원칙적으로 제공하지 않음
- 법령에 의한 경우 예외

### 5. 정보주체의 권리
- 열람, 정정, 삭제 요구권
- 처리 정지 요구권`,effectiveDate:"2024-11-01",isActive:!0,createdAt:"2024-10-20"},{id:"policy-003",name:"저작권 및 초상권 활용 동의",type:"usage",version:"v1.5",content:`## 저작권 및 초상권 활용 동의

### 1. 저작권
- 모든 사진/영상의 저작권은 MindGraphy에 귀속
- 고객은 개인적 용도로만 사용 가능
- 상업적 이용, 재판매, 2차 저작물 제작 금지

### 2. 초상권
- 고객이 피사체에 대한 초상권을 보유
- 고객 동의 없이 제3자에게 제공하지 않음

### 3. 포트폴리오 활용
- 고객 동의 시 포트폴리오, 홍보자료 활용 가능
- SNS, 웹사이트, 인쇄물 등 게재
- 언제든지 철회 요청 가능

### 4. 보정 및 편집
- MindGraphy는 사진 보정 및 편집 권한 보유
- 예술적 표현의 자유 인정`,effectiveDate:"2024-08-01",isActive:!0,createdAt:"2024-07-20"}],l=[{id:"tmpl-001",name:"계약 완료 확인",type:"email",category:"booking",subject:"[MindGraphy] {name} 님, 계약이 완료되었습니다",body:`안녕하세요, {name} 님!

MindGraphy와 함께하게 되어 영광입니다.

📅 촬영 일정: {date}
📍 촬영 장소: {venue}
📦 계약 상품: {package}

[고객 포털 바로가기]
{portalUrl}

감사합니다.
MindGraphy 팀`,variables:["{name}","{date}","{venue}","{package}","{portalUrl}"],triggerEvent:"contract_signed",isActive:!0,createdAt:"2024-01-10",updatedAt:"2024-10-15"},{id:"tmpl-002",name:"촬영 D-7 리마인더",type:"kakao",category:"reminder",subject:void 0,body:`🎉 {name} 님, 촬영이 일주일 남았습니다!

📅 {date} {time}
📍 {venue}
📷 담당 작가: {photographer}

[준비 체크리스트]
✓ 메이크업 예약 확인
✓ 예식장 위치 확인
✓ 특별 요청 사항 전달

문의: {phone}`,variables:["{name}","{date}","{time}","{venue}","{photographer}","{phone}"],triggerEvent:"shooting_date_minus_7",isActive:!0,createdAt:"2024-01-12",updatedAt:"2024-09-20"},{id:"tmpl-003",name:"프루프 사진 준비 완료",type:"email",category:"delivery",subject:"[MindGraphy] {name} 님, 프루프 사진이 준비되었습니다!",body:`안녕하세요, {name} 님!

촬영하신 사진의 프루프가 준비되었습니다.

📸 전체 사진 수: {totalPhotos}장
✅ 선택 가능: {maxSelections}장
⏰ 선택 마감일: {deadline}

[사진 선택하러 가기]
{proofUrl}

기한 내에 선택 부탁드립니다.

감사합니다.`,variables:["{name}","{totalPhotos}","{maxSelections}","{deadline}","{proofUrl}"],triggerEvent:"proof_ready",isActive:!0,createdAt:"2024-01-15",updatedAt:"2024-10-28"},{id:"tmpl-004",name:"선택 마감 D-3 알림",type:"sms",category:"reminder",subject:void 0,body:`[MindGraphy] {name}님, 프루프 선택 마감이 3일 남았습니다. 
마감: {deadline}
지금 선택하기: {proofUrl}`,variables:["{name}","{deadline}","{proofUrl}"],triggerEvent:"proof_deadline_minus_3",isActive:!0,createdAt:"2024-01-20",updatedAt:"2024-10-10"},{id:"tmpl-005",name:"최종 결과물 다운로드 안내",type:"email",category:"delivery",subject:"[MindGraphy] {name} 님, 최종 결과물이 준비되었습니다!",body:`{name} 님, 안녕하세요!

최종 편집된 사진이 모두 준비되었습니다.

📦 최종 파일: {fileCount}장
⏰ 다운로드 만료: {expiryDate}
🔒 비밀번호: {downloadPassword}

[다운로드 하러 가기]
{downloadUrl}

아래 항목이 배송 예정입니다:
{deliveryItems}

평생 소중한 추억이 되길 바랍니다!

MindGraphy 팀`,variables:["{name}","{fileCount}","{expiryDate}","{downloadPassword}","{downloadUrl}","{deliveryItems}"],triggerEvent:"final_delivery",isActive:!0,createdAt:"2024-02-01",updatedAt:"2024-11-01"},{id:"tmpl-006",name:"만족도 조사 요청",type:"email",category:"marketing",subject:"[MindGraphy] {name} 님의 소중한 의견을 들려주세요",body:`{name} 님, 안녕하세요!

MindGraphy의 서비스는 만족스러우셨나요?

📸 촬영 일자: {date}
👤 담당 작가: {photographer}

[만족도 조사 참여하기]
{surveyUrl}

소중한 의견 부탁드립니다.
리뷰 작성시 다음 촬영 10% 할인권 증정!

감사합니다.`,variables:["{name}","{date}","{photographer}","{surveyUrl}"],triggerEvent:"project_completed_plus_7",isActive:!0,createdAt:"2024-02-10",updatedAt:"2024-09-05"}];a.s(["mockNotificationSchedules",0,[{id:"sched-001",templateId:"tmpl-001",templateName:"계약 완료 확인",triggerType:"immediate",triggerCondition:"contract.status = signed",isActive:!0},{id:"sched-002",templateId:"tmpl-002",templateName:"촬영 D-7 리마인더",triggerType:"scheduled",triggerCondition:"shooting_date - 7 days",sendTime:"09:00",daysOffset:-7,isActive:!0},{id:"sched-003",templateId:"tmpl-003",templateName:"프루프 사진 준비 완료",triggerType:"immediate",triggerCondition:"proof.status = ready",isActive:!0},{id:"sched-004",templateId:"tmpl-004",templateName:"선택 마감 D-3 알림",triggerType:"scheduled",triggerCondition:"proof_deadline - 3 days",sendTime:"10:00",daysOffset:-3,isActive:!0},{id:"sched-005",templateId:"tmpl-005",templateName:"최종 결과물 다운로드 안내",triggerType:"immediate",triggerCondition:"project.status = final_delivery",isActive:!0}],"mockNotificationTemplates",0,l,"mockPartners",0,[{id:"partner-001",name:"프리미엄 메이크업샵",type:"makeup",contactPerson:"김미연",phone:"010-1234-5678",email:"premium@makeup.com",address:"서울시 강남구 압구정로 456",website:"https://premium-makeup.com",commissionRate:15,notes:"웨딩 전문, 출장 가능",isActive:!0,createdAt:"2024-01-05",updatedAt:"2024-10-20"},{id:"partner-002",name:"로즈 드레스샵",type:"dress",contactPerson:"이수진",phone:"010-2345-6789",email:"info@rosedress.com",address:"서울시 강남구 도산대로 789",website:"https://rosedress.com",commissionRate:10,notes:"드레스 + 턱시도 패키지",isActive:!0,createdAt:"2024-01-08",updatedAt:"2024-09-15"},{id:"partner-003",name:"스튜디오 블루밍",type:"studio",contactPerson:"박지훈",phone:"010-3456-7890",email:"contact@blooming.studio",address:"서울시 마포구 연남동 123",website:"https://blooming.studio",commissionRate:20,notes:"본식 촬영 협업, 장비 대여 가능",isActive:!0,createdAt:"2024-01-10",updatedAt:"2024-10-01"},{id:"partner-004",name:"웨딩플래너 by Grace",type:"planner",contactPerson:"최은혜",phone:"010-4567-8901",email:"grace@weddingplanner.com",website:"https://graceplan.com",commissionRate:12,notes:"전체 웨딩 플래닝, 프리미엄 고객 위주",isActive:!0,createdAt:"2024-01-15",updatedAt:"2024-10-10"},{id:"partner-005",name:"플라워하우스",type:"florist",contactPerson:"정민아",phone:"010-5678-9012",email:"info@flowerhouse.com",address:"서울시 서초구 반포대로 321",commissionRate:8,notes:"부케, 테이블 장식, 예식장 꽃 세팅",isActive:!0,createdAt:"2024-01-20",updatedAt:"2024-09-25"}],"mockPolicies",0,k,"mockProductOptions",0,[{id:"opt-001",name:"드론 촬영 추가",type:"addon",price:3e5,description:"외부 전경, 단체 사진 드론 촬영",isActive:!0,applicableProducts:["prod-001","prod-002"]},{id:"opt-002",name:"메이크업 동행",type:"addon",price:2e5,description:"메이크업샵 동행 촬영 (1시간)",isActive:!0,applicableProducts:["prod-001","prod-002"]},{id:"opt-003",name:"원본 파일 전체 제공",type:"upgrade",price:5e5,description:"RAW + JPEG 전체 원본 파일",isActive:!0,applicableProducts:["prod-002","prod-003"]},{id:"opt-004",name:"추가 앨범 제작 (20P)",type:"addon",price:4e5,description:"고급 양장 앨범 추가 제작",isActive:!0,applicableProducts:["prod-001","prod-002"]},{id:"opt-005",name:"긴급 납품 (2주)",type:"upgrade",price:8e5,description:"촬영 후 2주 내 최종 납품 보장",isActive:!0,applicableProducts:["prod-001","prod-002","prod-003"]}],"mockProducts",0,[{id:"prod-001",name:"프리미엄 웨딩 패키지",category:"wedding",basePrice:25e5,maxProofSelections:50,includesOriginals:!0,deliveryFormat:["Digital (High-Res)","Album 30P","USB"],turnAroundDays:30,isActive:!0,description:"본식 + 스냅 전체 촬영, 프리미엄 보정, 앨범 제작 포함",createdAt:"2024-01-15",updatedAt:"2024-11-01"},{id:"prod-002",name:"스탠다드 웨딩 패키지",category:"wedding",basePrice:18e5,maxProofSelections:40,includesOriginals:!1,deliveryFormat:["Digital (High-Res)","Album 20P"],turnAroundDays:45,isActive:!0,description:"본식 촬영 중심, 기본 보정, 앨범 제작 포함",createdAt:"2024-01-15",updatedAt:"2024-10-20"},{id:"prod-003",name:"스냅 촬영 패키지",category:"wedding",basePrice:8e5,maxProofSelections:30,includesOriginals:!1,deliveryFormat:["Digital (High-Res)"],turnAroundDays:21,isActive:!0,description:"스냅 촬영만, 디지털 파일 제공",createdAt:"2024-02-01",updatedAt:"2024-09-15"},{id:"prod-004",name:"가족 스튜디오 촬영",category:"studio",basePrice:35e4,maxProofSelections:20,includesOriginals:!1,deliveryFormat:["Digital (High-Res)","Prints 10P"],turnAroundDays:14,isActive:!0,description:"스튜디오 내 가족 촬영, 2시간",createdAt:"2024-03-10",updatedAt:"2024-10-05"},{id:"prod-005",name:"기업 행사 촬영",category:"event",basePrice:12e5,maxProofSelections:100,includesOriginals:!0,deliveryFormat:["Digital (High-Res)","USB"],turnAroundDays:7,isActive:!1,description:"기업 행사, 세미나, 컨퍼런스 촬영 (단종)",createdAt:"2024-01-20",updatedAt:"2024-08-30"}],"mockVenues",0,[{id:"venue-001",name:"더 그랜드 웨딩홀",type:"wedding_hall",address:"서울시 강남구 테헤란로 123",phone:"02-1234-5678",ballrooms:["그랜드홀 (300석)","프리미어홀 (200석)","스위트홀 (100석)"],parkingInfo:"지하 3층 주차장, 발렛파킹 가능",notes:"천장 높이 5m, 자연광 우수",isActive:!0,createdAt:"2024-01-10",updatedAt:"2024-10-15"},{id:"venue-002",name:"신라호텔 영빈관",type:"hotel",address:"서울시 중구 동호로 249",phone:"02-2233-3131",ballrooms:["다이아몬드홀 (500석)","에메랄드홀 (300석)","루비홀 (150석)"],parkingInfo:"호텔 내 주차장 이용",notes:"고급스러운 인테리어, 샹들리에 조명",isActive:!0,createdAt:"2024-01-12",updatedAt:"2024-09-20"},{id:"venue-003",name:"명동성당",type:"church",address:"서울시 중구 명동길 74",phone:"02-774-1784",ballrooms:["대성당"],parkingInfo:"주변 공영주차장 이용",notes:"역사적 건축물, 촬영 제약 있음 (플래시 금지)",isActive:!0,createdAt:"2024-01-15",updatedAt:"2024-08-10"},{id:"venue-004",name:"남이섬 야외정원",type:"outdoor",address:"강원도 춘천시 남산면 남이섬길 1",phone:"031-580-8114",ballrooms:["메타세쿼이아 길","잔디광장"],parkingInfo:"선착장 주차장",notes:"날씨 영향 큼, 예비일정 필수",isActive:!0,createdAt:"2024-02-01",updatedAt:"2024-10-05"},{id:"venue-005",name:"63스퀘어 아쿠아플라넷",type:"other",address:"서울시 영등포구 63로 50",phone:"02-789-5663",ballrooms:["아쿠아홀"],parkingInfo:"건물 내 주차장",notes:"수족관 배경, 독특한 분위기",isActive:!1,createdAt:"2024-02-10",updatedAt:"2024-07-20"}],"previewTemplateWithVariables",0,(a,b)=>{let c=a.subject||"",d=a.body;return Object.entries(b).forEach(([a,b])=>{let e=RegExp(a.replace(/[{}]/g,"\\$&"),"g");c=c.replace(e,b),d=d.replace(e,b)}),{subject:c,body:d}},"sampleTemplateVariables",0,{"{name}":"김철수 & 이영희","{date}":"2025년 4월 12일 토요일","{time}":"오후 2시","{venue}":"더 그랜드 웨딩홀","{package}":"프리미엄 웨딩 패키지","{photographer}":"박작가","{phone}":"02-1234-5678","{portalUrl}":"https://mindgraphy.com/c/demo-token-2025","{proofUrl}":"https://mindgraphy.com/c/demo-token-2025/proof","{downloadUrl}":"https://mindgraphy.com/c/demo-token-2025/download","{totalPhotos}":"450","{maxSelections}":"50","{deadline}":"2025년 5월 12일","{fileCount}":"50","{expiryDate}":"2025년 6월 12일","{downloadPassword}":"1234","{deliveryItems}":"앨범 30P, USB","{surveyUrl}":"https://mindgraphy.com/survey/123"}],34846)}];

//# sourceMappingURL=_25b8b7aa._.js.map