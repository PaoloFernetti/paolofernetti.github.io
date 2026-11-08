export interface SteamGame {
  name: string
  url: string
  logo: string
  /** Total hours on record, e.g. "936" */
  hoursOnRecord: string
  /** Hours played in the last 2 weeks, e.g. "58.3" */
  hours2wk: string
}

export interface SteamData {
  steamId: string
  nickname: string
  realName: string
  profileUrl: string
  avatar: string
  onlineState: string
  memberSince: string
  location: string
  /** Profile level, null when it could not be scraped */
  level: number | null
  gamesCount: number | null
  /** Hours played in the last 2 weeks, e.g. "65" */
  hours2wk: string
  games: SteamGame[]
}
