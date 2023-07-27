function extractDomain(url: string): string {
  return new URL(url).hostname;
}

export { extractDomain };
