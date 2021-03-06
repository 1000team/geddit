import { RequestHandler, Request } from 'express'
import { StatusError } from './error'

interface Paging {
  paging: {
    page: number
    pageSize: number
    offset: number
  }
}

export type PageRequest = Request & Paging

const handler: RequestHandler = (req: PageRequest, _, next) => {
  const { page = 1, pageSize = 10 } = req.query
  const offset = (page * pageSize) - pageSize

  const parsedSize = parseInt(pageSize as any, 10)
  if (parsedSize > 101 || parsedSize < 1) {
    const error = new StatusError('Invalid page size', 400)
    next(error)
    return
  }

  req.paging = {
    page,
    pageSize,
    offset
  }

  next()
}

export default handler