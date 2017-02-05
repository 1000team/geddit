import db, { QUOTE } from '../../store'
import { RequestHandler } from 'express'
import { StatusError } from '../error'
import toDto from './to-dto'

const handler: RequestHandler = async (req, res, next) => {
  const id = req.params.id
  const quote: Schema.Quote | undefined = await db(QUOTE)
    .select()
    .where('id', id)
    .andWhere('approved', true)
    .first()

  if (!quote) {
    const error = new StatusError(`Quote '${id}' not found`, 404)
    next(error)
    return
  }

  res.json(toDto(quote, req.signedCookies))
}

export default handler