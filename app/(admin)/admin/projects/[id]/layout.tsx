import { ReactNode } from 'react'

// Static export를 위한 프로젝트 ID 목록
export async function generateStaticParams() {
  return [
    { id: 'project-baby-kwon' },
    // 추가 프로젝트 ID들이 여기에 추가됩니다
  ]
}

export default function ProjectDetailLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}

