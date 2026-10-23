import "server-only";
import { contributionSnapshot } from "@/data/contribution-snapshot";
export type ContributionDay = { date: string; count: number; level: number };
export type Contributions = {
  days: ContributionDay[];
  total: number;
  from: string;
  to: string;
  capturedAt: string;
  mode: "live" | "snapshot";
};
const fallback: Contributions = {
  ...contributionSnapshot,
  days: [...contributionSnapshot.days],
  mode: "snapshot",
};
export async function getContributions(): Promise<Contributions> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return fallback;
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query { user(login: "deshandinidu2001") { contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { contributionCount date contributionLevel } } } } } }`,
      }),
      next: { revalidate: 3600, tags: ["github-contributions"] },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return fallback;
    const json = await response.json();
    const calendar =
      json.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar?.weeks?.length) return fallback;
    const levels = [
      "NONE",
      "FIRST_QUARTILE",
      "SECOND_QUARTILE",
      "THIRD_QUARTILE",
      "FOURTH_QUARTILE",
    ];
    const days: ContributionDay[] = calendar.weeks.flatMap(
      (w: {
        contributionDays: {
          contributionCount: number;
          date: string;
          contributionLevel: string;
        }[];
      }) =>
        w.contributionDays.map((d) => ({
          date: d.date,
          count: d.contributionCount,
          level: Math.max(0, levels.indexOf(d.contributionLevel)),
        })),
    );
    return {
      days,
      total: calendar.totalContributions,
      from: days[0].date,
      to: days.at(-1)!.date,
      capturedAt: new Date().toISOString().slice(0, 10),
      mode: "live",
    };
  } catch {
    return fallback;
  }
}
