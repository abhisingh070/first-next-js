export type ContestStatus = "UPCOMING" | "LIVE" | "ENDED";

export type ProblemAttemptStatus = "SOLVED" | "UNSOLVED" | "NOT_ATTEMPTED";

export type LeaderboardFilter = "weekly" | "monthly" | "all_time";

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  rating: number;
};

export type UserStats = {
  totalSolved: number;
  totalSubmissions: number;
  accuracy: number;
  currentStreak: number;
  contestsParticipated: number;
};

export type RecentActivityItem = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  solvedAt: string;
};

export type DashboardUser = {
  id: string;
  username: string;
  rank?: number;
  joinDate: string;
  stats: UserStats;
  recentActivity: RecentActivityItem[];
};

export type ContestProblem = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
};

export type ContestListItem = {
  id: string;
  title: string;
  startTime: string;
  durationMinutes: number;
  problems: ContestProblem[];
};

export type ContestSubmissionState = {
  userId: string;
  contestId: string;
  problemId: string;
  status: ProblemAttemptStatus;
};

export type LeaderboardRow = {
  username: string;
  rating: number;
  problemsSolved: number;
  contestsParticipated: number;
};
