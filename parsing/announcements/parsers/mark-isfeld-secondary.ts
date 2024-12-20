import { AnnouncementSection } from "@/types/school";
import * as cheerio from "cheerio";
import { DailyAnnouncementsParsingFunction } from "./types";
const MEETINGS_AND_PRACTICES_ACTUAL_HEADING = "MEETINGS AND PRACTICES TODAY";
const referenceHeadings: Array<{
  displayName: string;
  emoji: string;
  actualName: string;
}> = [
  {
    displayName: "Today",
    emoji: "✨",
    actualName: "NEW!",
  },
  {
    displayName: "Meetings & Practices",
    emoji: "🧩",
    actualName: MEETINGS_AND_PRACTICES_ACTUAL_HEADING,
  },
  {
    displayName: "Re-runs",
    emoji: "📆",
    actualName: "RE- RUNS",
  },
  {
    displayName: "Career Centre",
    emoji: "💼",
    actualName: "CAREER CENTRE/ WORK EXPERIENCE/VOLUNTEERING",
  },
  {
    displayName: "Bursaries & Scholarships",
    emoji: "💵",
    actualName: "BURSARIES/SCHOLARSHIPS",
  },
  {
    displayName: "Grads",
    emoji: "🧑‍🎓",
    actualName: "GRADS",
  },
];
const meetingsAndClubsColumns = ["Time", "Event", "Place", "Reason"];
const firstHeadingValue = referenceHeadings[0].actualName;
export const parseMarkIsfeldSecondaryDailyAnnouncements: DailyAnnouncementsParsingFunction =
  (elements) => {
    const firstHeadingIndex = elements.findIndex(
      (element) =>
        element.type === "Title" && element.text === firstHeadingValue
    );
    if (firstHeadingIndex === -1) return;
    let nextHeadingIndex = 1;
    let nextHeadingValue = referenceHeadings[nextHeadingIndex].actualName;
    const sections: AnnouncementSection[] = [];
    let accumulatedElements = [];
    for (let i = firstHeadingIndex + 1; i < elements.length; i++) {
      const element = elements[i];
      if (element.type === "Title" && element.text === nextHeadingValue) {
        sections.push({
          heading: referenceHeadings[nextHeadingIndex - 1].displayName,
          emoji: referenceHeadings[nextHeadingIndex - 1].emoji,
          items: accumulatedElements,
        });
        accumulatedElements = [];
        nextHeadingIndex += 1;
        if (nextHeadingValue === MEETINGS_AND_PRACTICES_ACTUAL_HEADING) {
          i++;
          let tableElement;
          while (i < elements.length) {
            const possibleElement = elements[i];
            if (possibleElement.type === "Table") {
              tableElement = possibleElement;
              break;
            }
            i++;
          }
          i++; //for next heading skip
          if (tableElement) {
            const html = tableElement.metadata.text_as_html;
            const $table = cheerio.load(html);
            const tableData: string[][] = [meetingsAndClubsColumns];
            $table("table tr").each((i, row) => {
              if (i === 0) return;
              const rowData: string[] = [];

              for (const cell of $table(row).find("th, td").toArray()) {
                const cellText = $table(cell).text().trim().split("\n")[0];

                rowData.push(cellText.replaceAll("|", ""));
              }
              if (rowData.length === 4) {
                tableData.push(rowData);
              }
            });
            sections.push({
              heading: referenceHeadings[nextHeadingIndex - 1].displayName,
              emoji: referenceHeadings[nextHeadingIndex - 1].emoji,
              table: tableData,
            });
          }
          nextHeadingIndex += 1;
        }
        if (nextHeadingIndex >= referenceHeadings.length - 1) break;
        nextHeadingValue = referenceHeadings[nextHeadingIndex].actualName;

        continue;
      }

      accumulatedElements.push(element.text);
    }

    return sections;
  };
