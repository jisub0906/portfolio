"use client";

import React from "react";
import PageTitle from "./PageTitle";

const PageTitleExample: React.FC = () => {
  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">PageTitle 컴포넌트 예제</h1>
      
      {/* 기본 제목만 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">1. 기본 제목만</h2>
        <PageTitle title="지섭의 포트폴리오" />
      </div>

      {/* 제목과 부제목 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">2. 제목과 부제목</h2>
        <PageTitle 
          title="프로젝트 쇼케이스"
          subtitle="개발자 JISUB이 참여한 다양한 프로젝트들을 소개합니다." 
        />
      </div>

      {/* ReactNode를 사용한 제목 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">3. ReactNode를 사용한 제목</h2>
        <PageTitle 
          title={
            <span>
              기술 스택 <span className="text-primary">& 경험</span>
            </span>
          }
          subtitle="다양한 기술 스택과 개발 경험을 확인해보세요."
        />
      </div>

      {/* ReactNode를 사용한 부제목 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">4. ReactNode를 사용한 부제목</h2>
        <PageTitle 
          title="연락처"
          subtitle={
            <span>
              언제든지 <strong>연락</strong>주세요. 
              <br />
              새로운 기회와 협업을 기다리고 있습니다.
            </span>
          }
        />
      </div>

      {/* 커스텀 클래스가 적용된 제목 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">5. 커스텀 스타일이 적용된 제목</h2>
        <PageTitle 
          title="블로그"
          subtitle="개발 경험과 기술적 인사이트를 공유합니다."
          className="text-center py-8 border-2 border-dashed border-border rounded-lg"
        />
      </div>

      {/* 긴 제목과 부제목 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">6. 긴 제목과 부제목</h2>
        <PageTitle 
          title="풀스택 웹 개발자로서의 여정과 성장 이야기"
          subtitle="프론트엔드부터 백엔드까지, 다양한 기술 스택을 활용한 프로젝트 경험과 지속적인 학습을 통해 쌓아온 개발 역량을 소개합니다. 새로운 기술에 대한 호기심과 문제 해결에 대한 열정으로 더 나은 사용자 경험을 만들어가고 있습니다."
        />
      </div>

      {/* 빈 제목 테스트 (렌더링되지 않음) */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">7. 빈 제목 테스트 (아무것도 표시되지 않음)</h2>
        <p className="text-sm text-muted-foreground">아래에는 빈 제목으로 인해 아무것도 렌더링되지 않습니다:</p>
        <PageTitle title="" subtitle="이 부제목은 표시되지 않습니다." />
        <PageTitle title={null} subtitle="이 부제목도 표시되지 않습니다." />
        <PageTitle title={undefined} subtitle="이 부제목도 표시되지 않습니다." />
        <p className="text-sm text-muted-foreground">위 공간이 비어있다면 정상적으로 동작하는 것입니다.</p>
      </div>

      {/* 다양한 페이지 시나리오 */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">8. 실제 페이지 시나리오 예시</h2>
        
        {/* 홈페이지 */}
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-md font-medium mb-4 text-muted-foreground">홈페이지</h3>
          <PageTitle 
            title="안녕하세요, 개발자 JISUB입니다"
            subtitle="창의적인 아이디어와 기술적 전문성으로 더 나은 웹 경험을 만들어갑니다."
          />
        </div>

        {/* 프로젝트 페이지 */}
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-md font-medium mb-4 text-muted-foreground">프로젝트 페이지</h3>
          <PageTitle 
            title="프로젝트"
            subtitle="다양한 기술 스택을 활용하여 개발한 프로젝트들을 확인해보세요."
          />
        </div>

        {/* 블로그 페이지 */}
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-md font-medium mb-4 text-muted-foreground">블로그 페이지</h3>
          <PageTitle 
            title="개발 블로그"
            subtitle="기술적 경험과 인사이트를 공유하는 공간입니다."
          />
        </div>

        {/* 소개 페이지 */}
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-md font-medium mb-4 text-muted-foreground">소개 페이지</h3>
          <PageTitle 
            title="About Me"
            subtitle="개발자로서의 여정과 가치관을 소개합니다."
          />
        </div>
      </div>

      {/* 반응형 테스트 안내 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">9. 반응형 디자인 테스트</h2>
        <p className="text-sm text-muted-foreground mb-4">
          브라우저 창 크기를 조절하여 반응형 타이포그래피를 확인해보세요:
        </p>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>모바일 (sm 미만): text-4xl, text-lg</li>
          <li>데스크탑 (sm 이상): text-5xl, text-xl</li>
        </ul>
        <PageTitle 
          title="반응형 타이포그래피 테스트"
          subtitle="화면 크기에 따라 폰트 크기가 자동으로 조절됩니다."
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default PageTitleExample; 