import { IssueModel } from "./issue"

export interface ReviewModel {
    language: string
    codeQuality: number
    issues: IssueModel[]|null
}