import { Task } from "../types/task.type";

export function calculatePriorityScore(task: Task): number {
  const descriptionScore = getDescriptionScore(task.description);
  const titleScore = getTitleScore(task.title);
  const keywordScore = getKeywordScore(`${task.title} ${task.description}`);

  const weightedDescriptionScore = descriptionScore * 0.3;
  const weightedTitleScore = titleScore * 0.2;
  const weightedKeywordScore = keywordScore * 0.3;
  let totalWeightedScore =
    weightedDescriptionScore + weightedTitleScore + weightedKeywordScore;
  if (task.createdAt) {
    const creationDateScore = getCreationDateScore(new Date(task.createdAt));
    const weightedCreationDateScore = creationDateScore * 0.2;
    totalWeightedScore += weightedCreationDateScore;
  }

  const maxPossibleScore = 3 * 0.3 + 1.5 * 0.2 + 2 * 0.3 + 1 * 0.2;
  Math.min(totalWeightedScore / maxPossibleScore, 1);
  return Math.min(totalWeightedScore / maxPossibleScore, 1);
}

function getDescriptionScore(description: string): number {
  const length = description.length;
  if (length < 10) return 1;
  if (length <= 20) return 2;
  return 3;
}

function getTitleScore(title: string): number {
  const length = title.length;
  if (length < 5) return 0.5;
  if (length <= 15) return 1;
  return 1.5;
}

function getKeywordScore(content: string): number {
  let score = 0;
  const lowerContent = content.toLowerCase();
  if (lowerContent.includes("urgent")) score += 2;
  if (lowerContent.includes("important")) score += 1.5;
  if (lowerContent.includes("low-priority")) score -= 1;
  return score;
}

function getCreationDateScore(createdDate: Date): number {
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - createdDate.getTime();
  const hoursDiff = timeDiff / (1000 * 60 * 60);
  return hoursDiff <= 24 ? 1 : 0;
}
