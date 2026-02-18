import SolveWorkspace from "@/components/solve/SolveWorkspace";

type SolvePageProps = {
  params: Promise<{ questionId: string }>;
};

export default async function SolveQuestionPage({ params }: SolvePageProps) {
  const { questionId } = await params;

  return <SolveWorkspace initialQuestionId={questionId} />;
}
