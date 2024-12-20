const educationAbbreviations = new Set([
  "EFP",
  "PhD",
  "MBA",
  "BA",
  "MA",
  "BSc",
  "MSc",
  "UN",
  "AP",
]);
const subjectsToAbbreviation: Record<string, string> = {
  "teacher advisory": "TA",
};
const smallWords = new Set([
  "a",
  "an",
  "the",
  "and",
  "but",
  "or",
  "nor",
  "at",
  "by",
  "for",
  "in",
  "of",
  "on",
  "to",
  "up",
  "with",
]);
export const prettifySubjectName = (name: string) => {
  const lowerCaseName = name.toLowerCase();
  const abbreviation = subjectsToAbbreviation[lowerCaseName];
  if (abbreviation) return abbreviation;
  return lowerCaseName
    .split(/(\s+|[-–—])/g)
    .map((word, i) => {
      if (educationAbbreviations.has(word.toUpperCase()) || /^\d/.test(word)) {
        return word.toUpperCase();
      } else if (i === 0 || !smallWords.has(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word;
      }
    })
    .join("");
};
