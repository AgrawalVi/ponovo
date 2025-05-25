import { db } from '@/lib/db'

// Define a type that captures the common query interface between db and transaction
export type DbOrTx = {
  query: typeof db.query
  select: typeof db.select
  insert: typeof db.insert
  update: typeof db.update
  delete: typeof db.delete
}
