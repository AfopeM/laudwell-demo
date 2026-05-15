export function detectEdit(localText: string, generatedText: string): boolean {
  return localText.trim() !== generatedText.trim();
}
