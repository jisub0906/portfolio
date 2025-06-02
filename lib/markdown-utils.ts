// lib/markdown-utils.ts - 마크다운 처리 유틸리티

import type { Heading } from "@/types/blog";

/**
 * 텍스트에서 URL 친화적인 ID를 생성합니다.
 * @param text - 제목 텍스트
 * @returns 생성된 ID
 */
export function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // 한글, 영문, 숫자만 남기고 나머지는 하이픈으로 변경
    .replace(/[^a-z0-9가-힣\s]/g, '-')
    // 공백을 하이픈으로 변경
    .replace(/\s+/g, '-')
    // 연속된 하이픈을 하나로 합치기
    .replace(/-+/g, '-')
    // 앞뒤 하이픈 제거
    .replace(/^-|-$/g, '');
}

/**
 * 마크다운 텍스트에서 제목들을 추출하여 Heading 배열로 반환합니다.
 * @param markdown - 마크다운 텍스트
 * @param minLevel - 최소 제목 레벨 (기본값: 2)
 * @param maxLevel - 최대 제목 레벨 (기본값: 4)
 * @returns 추출된 제목 배열
 */
export function extractHeadingsFromMarkdown(
  markdown: string,
  minLevel: number = 2,
  maxLevel: number = 4
): Heading[] {
  const headings: Heading[] = [];
  const lines = markdown.split('\n');
  const usedIds = new Set<string>();

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // ATX 스타일 헤딩 매칭 (# ## ### ####)
    const match = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
    
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      
      // 지정된 레벨 범위 내의 제목만 처리
      if (level >= minLevel && level <= maxLevel) {
        let id = generateHeadingId(text);
        
        // 중복 ID 처리
        let counter = 1;
        const originalId = id;
        while (usedIds.has(id)) {
          id = `${originalId}-${counter}`;
          counter++;
        }
        
        usedIds.add(id);
        
        headings.push({
          id,
          level,
          text,
        });
      }
    }
  }

  return headings;
}

/**
 * 마크다운 텍스트에 제목 ID를 자동으로 추가합니다.
 * @param markdown - 원본 마크다운 텍스트
 * @param minLevel - 최소 제목 레벨 (기본값: 2)
 * @param maxLevel - 최대 제목 레벨 (기본값: 4)
 * @returns ID가 추가된 마크다운 텍스트
 */
export function addHeadingIdsToMarkdown(
  markdown: string,
  minLevel: number = 2,
  maxLevel: number = 4
): string {
  const lines = markdown.split('\n');
  const usedIds = new Set<string>();
  
  return lines.map(line => {
    const trimmedLine = line.trim();
    const match = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
    
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      
      if (level >= minLevel && level <= maxLevel) {
        let id = generateHeadingId(text);
        
        // 중복 ID 처리
        let counter = 1;
        const originalId = id;
        while (usedIds.has(id)) {
          id = `${originalId}-${counter}`;
          counter++;
        }
        
        usedIds.add(id);
        
        // 기존에 ID가 있는지 확인
        if (text.includes('{#')) {
          return line; // 이미 ID가 있으면 그대로 반환
        }
        
        return `${match[1]} ${text} {#${id}}`;
      }
    }
    
    return line;
  }).join('\n');
}

/**
 * HTML 문자열에서 제목들을 추출하여 Heading 배열로 반환합니다.
 * @param html - HTML 문자열
 * @param minLevel - 최소 제목 레벨 (기본값: 2)
 * @param maxLevel - 최대 제목 레벨 (기본값: 4)
 * @returns 추출된 제목 배열
 */
export function extractHeadingsFromHTML(
  html: string,
  minLevel: number = 2,
  maxLevel: number = 4
): Heading[] {
  const headings: Heading[] = [];
  
  // 브라우저 환경에서만 실행
  if (typeof window === 'undefined') {
    return headings;
  }
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  for (let level = minLevel; level <= maxLevel; level++) {
    const elements = doc.querySelectorAll(`h${level}`);
    
    elements.forEach(element => {
      const id = element.id || generateHeadingId(element.textContent || '');
      const text = element.textContent?.trim() || '';
      
      if (text) {
        headings.push({
          id,
          level,
          text,
        });
      }
    });
  }
  
  // 문서 순서대로 정렬
  return headings.sort((a, b) => {
    const aElement = doc.getElementById(a.id);
    const bElement = doc.getElementById(b.id);
    
    if (!aElement || !bElement) return 0;
    
    return aElement.compareDocumentPosition(bElement) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  });
} 