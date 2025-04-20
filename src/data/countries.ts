export interface Country {
  id: string;
  name: string;
  timezone: string;
  flag: string;
  remoteRank: number; // Higher number = higher rank for remote work
}

// Top countries for remote work based on various reports
export const countries: Country[] = [
  {
    id: "usa",
    name: "United States",
    timezone: "America/New_York",
    flag: "🇺🇸",
    remoteRank: 10
  },
  {
    id: "can",
    name: "Canada",
    timezone: "America/Toronto",
    flag: "🇨🇦",
    remoteRank: 9
  },
  {
    id: "uk",
    name: "United Kingdom",
    timezone: "Europe/London",
    flag: "🇬🇧",
    remoteRank: 8
  },
  {
    id: "ger",
    name: "Germany",
    timezone: "Europe/Berlin",
    flag: "🇩🇪",
    remoteRank: 7
  },
  {
    id: "aus",
    name: "Australia",
    timezone: "Australia/Sydney",
    flag: "🇦🇺",
    remoteRank: 6
  },
  {
    id: "jpn",
    name: "Japan",
    timezone: "Asia/Tokyo",
    flag: "🇯🇵",
    remoteRank: 5
  },
  {
    id: "ind",
    name: "India",
    timezone: "Asia/Kolkata",
    flag: "🇮🇳",
    remoteRank: 9
  },
  {
    id: "bra",
    name: "Brazil",
    timezone: "America/Sao_Paulo",
    flag: "🇧🇷",
    remoteRank: 6
  },
  {
    id: "uae",
    name: "United Arab Emirates",
    timezone: "Asia/Dubai",
    flag: "🇦🇪",
    remoteRank: 7
  },
  {
    id: "sgp",
    name: "Singapore",
    timezone: "Asia/Singapore",
    flag: "🇸🇬",
    remoteRank: 8
  },
  {
    id: "ned",
    name: "Netherlands",
    timezone: "Europe/Amsterdam",
    flag: "🇳🇱",
    remoteRank: 7
  },
  {
    id: "est",
    name: "Estonia",
    timezone: "Europe/Tallinn",
    flag: "🇪🇪",
    remoteRank: 8
  }
];

export type ClockDesign = "classic" | "modern" | "minimal" | "digital" | "digital-modern" | "digital-minimal";

export const clockDesigns = [
  { id: "classic", name: "Classic" },
  { id: "modern", name: "Modern" },
  { id: "minimal", name: "Minimal" },
  { id: "digital", name: "Digital" },
  { id: "digital-modern", name: "Digital Modern" },
  { id: "digital-minimal", name: "Digital Minimal" },
];

export default countries;
