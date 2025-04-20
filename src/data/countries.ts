export interface Country {
  id: string;
  name: string;
  timezone: string;
  flag: string;
  remoteRank: number;
  displayName?: string; // Add display name for custom naming
}

export type ClockDesign = "digital-classic" | "digital-modern" | "digital-minimal";

export const clockDesigns = [
  { id: "digital-classic", name: "Classic Digital" },
  { id: "digital-modern", name: "Modern Digital" },
  { id: "digital-minimal", name: "Minimal Digital" },
];

// Keep existing countries array
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

export default countries;
