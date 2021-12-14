export interface ResponsePaginate {
  total: number
  currentPage: number
  totalPages: number
  previousPage: boolean
  nextPage: boolean
  data: any[]
}