import { NextResponse } from "next/server";

import { getQuestionById } from "@/lib/mock-questions";

type QuestionRouteContext = {
  params: Promise<{ questionId: string }>;
};

export async function GET(_request: Request, { params }: QuestionRouteContext) {
  const { questionId } = await params;
  const question = getQuestionById(questionId);

  if (!question) {
    return NextResponse.json({ error: `Question ${questionId} was not found.` }, { status: 404 });
  }

  return NextResponse.json({ data: question });
}

