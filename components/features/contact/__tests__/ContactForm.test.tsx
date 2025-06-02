/// <reference types="@testing-library/jest-dom" />

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "../ContactForm";

// fetch mock
global.fetch = jest.fn();

// sonner toast mock
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("ContactForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("모든 필수 필드가 렌더링되어야 한다", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/이름/)).toBeInTheDocument();
    expect(screen.getByLabelText(/이메일/)).toBeInTheDocument();
    expect(screen.getByLabelText(/제목/)).toBeInTheDocument();
    expect(screen.getByLabelText(/문의 내용/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /문의 보내기/ })).toBeInTheDocument();
  });

  it("필수 필드가 비어있을 때 유효성 검사 오류가 표시되어야 한다", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const submitButton = screen.getByRole("button", { name: /문의 보내기/ });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/이름은 2자 이상이어야 합니다/)).toBeInTheDocument();
      expect(screen.getByText(/유효한 이메일 주소를 입력해주세요/)).toBeInTheDocument();
      expect(screen.getByText(/문의 내용은 최소 10자 이상이어야 합니다/)).toBeInTheDocument();
    });
  });

  it("유효한 데이터로 폼을 제출할 수 있어야 한다", async () => {
    const user = userEvent.setup();
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ContactForm />);

    // 폼 필드 채우기
    await user.type(screen.getByLabelText(/이름/), "홍길동");
    await user.type(screen.getByLabelText(/이메일/), "test@example.com");
    await user.type(screen.getByLabelText(/제목/), "테스트 문의");
    await user.type(screen.getByLabelText(/문의 내용/), "이것은 테스트 문의 내용입니다.");

    // 폼 제출
    const submitButton = screen.getByRole("button", { name: /문의 보내기/ });
    await user.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "홍길동",
          email: "test@example.com",
          subject: "테스트 문의",
          message: "이것은 테스트 문의 내용입니다.",
        }),
      });
    });
  });

  it("제출 중에는 버튼이 비활성화되어야 한다", async () => {
    const user = userEvent.setup();
    
    // fetch를 지연시켜 로딩 상태 테스트
    (fetch as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 100))
    );

    render(<ContactForm />);

    // 유효한 데이터 입력
    await user.type(screen.getByLabelText(/이름/), "홍길동");
    await user.type(screen.getByLabelText(/이메일/), "test@example.com");
    await user.type(screen.getByLabelText(/문의 내용/), "테스트 문의 내용입니다.");

    const submitButton = screen.getByRole("button", { name: /문의 보내기/ });
    await user.click(submitButton);

    // 로딩 상태 확인
    expect(screen.getByText(/전송 중.../)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
}); 