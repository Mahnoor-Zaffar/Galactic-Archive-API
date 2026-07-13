import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export function useResource(fetchFn, params = {}) {
  const [searchParams] = useSearchParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const page = searchParams.get('page') || params.page || '1'
  const search = searchParams.get('search') || params.search || ''

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchFn({ page, limit: 12, search, ...params })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [page, search])

  return { data, loading, error, page, search }
}
