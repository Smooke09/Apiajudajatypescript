import { BadRequestError } from "@/helpers/api_errors"
import { Request, Response, NextFunction } from "express"
import { IssueData } from "zod"

const bodyValidation =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.safeParse(req.body)

    if (!validation.success) {
      const errorMessages = validation.error.issues.map(
        (issue: IssueData) => issue.message
      )
      errorMessages.map((message: string) => {
        throw new BadRequestError(message)
      })
    }
    next()
  }

export default bodyValidation
