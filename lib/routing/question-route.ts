const QUESTION_ROUTE_PATTERN = /^\/(?:solve|problems)\/([^/?#]+)/;

export function extractQuestionIdFromPath(pathname: string) {
  const match = pathname.match(QUESTION_ROUTE_PATTERN);
  if (!match?.[1]) {
    return null;
  }

  return decodeURIComponent(match[1]);
}

