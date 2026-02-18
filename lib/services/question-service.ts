import type { CodingQuestion, EditorLanguage, RunCodeResult, SubmitCodeResult } from "@/lib/types";

type QuestionResponse = {
  data?: CodingQuestion;
  error?: string;
};

type RunPayload = {
  questionId: string;
  language: EditorLanguage;
  code: string;
};

type SubmitPayload = RunPayload;

function delay(milliseconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export async function fetchQuestionById(questionId: string, signal?: AbortSignal) {
  const response = await fetch(`/api/questions/${questionId}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });

  const payload = (await response.json()) as QuestionResponse;
  if (!response.ok || !payload.data) {
    throw new Error(payload.error ?? "Unable to load question details.");
  }

  return payload.data;
}

export async function runQuestionCode(payload: RunPayload) {
  await delay(600);

  const codeLines = payload.code.split("\n").filter((line) => line.trim().length > 0).length;
  const runtimeMs = Math.max(14, Math.min(120, 12 + codeLines * 2));
  const stdout = [
    `Running Question ${payload.questionId} (${payload.language})`,
    "Execution finished successfully.",
    `Processed ${codeLines} non-empty lines.`,
  ].join("\n");

  const output: RunCodeResult = {
    status: "success",
    stdout,
    runtimeMs,
  };

  return output;
}

export async function submitQuestionCode(payload: SubmitPayload) {
  await delay(900);

  const normalizedCode = payload.code.trim();
  const looksIncomplete =
    normalizedCode.length < 24 ||
    normalizedCode.includes("TODO") ||
    normalizedCode.includes("pass");

  const output: SubmitCodeResult = looksIncomplete
    ? {
        status: "Wrong Answer",
        message: "Some test cases failed. Keep iterating on edge cases.",
        runtimeMs: 0,
        memoryMb: 0,
      }
    : {
        status: "Accepted",
        message: `All test cases passed for Question ${payload.questionId}.`,
        runtimeMs: 38,
        memoryMb: 42.6,
      };

  return output;
}
