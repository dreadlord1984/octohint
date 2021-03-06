import * as ts from 'typescript'

export interface Occurrence {
  isWriteAccess?: boolean
  range: ts.LineAndCharacter
  width: number
}

export interface QuickInfo {
  info: ts.SymbolDisplayPart[] | string
  range: ts.LineAndCharacter
  width: number
}

export type Definition = ts.LineAndCharacter

type Position = {
  x: number
  y: number
}

export enum Message {
  service = 'service',
  occurrence = 'occurrence',
  quickInfo = 'quickInfo',
}

// Message from background
// interface BackgroundMessageBase {}

interface BackgroundMessageOfService {}

export interface BackgroundMessageOfOccurrence {
  occurrences: Occurrence[]
  info?: ts.LineAndCharacter
}

export interface BackgroundMessageOfQuickInfo {
  data: QuickInfo
}

interface BackgroundMessageOfError {
  error: string
}

export type BackgroundMessage =
  | BackgroundMessageOfService
  | BackgroundMessageOfOccurrence
  | BackgroundMessageOfQuickInfo
  | BackgroundMessageOfError

// Message from Content Script
interface BaseContentMessage {
  file: string
  codeUrl: string
}

interface ContentMessageOfService extends BaseContentMessage {
  type: Message.service
  tabSize: number
}

interface ContentMessageOfOccurrence extends BaseContentMessage {
  type: Message.occurrence
  position: Position
  meta?: boolean
}

interface ContentMessageOfQuickInfo extends BaseContentMessage {
  type: Message.quickInfo
  position: Position
}

export type ContentMessage = ContentMessageOfService | ContentMessageOfOccurrence | ContentMessageOfQuickInfo

export type SendMessageToBackground = (data: ContentMessage, cb: (message: BackgroundMessage) => void) => void

export type AddBackgroundListener = (
  listener: (message: ContentMessage, sendResponse: (message: BackgroundMessage) => void) => void,
) => void
