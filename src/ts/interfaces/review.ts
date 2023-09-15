interface Review {
  id_driver: number,
  id_user: number,
  rating: number
  comments: string
  anonymous: anonymous
}

enum anonymous {
  S = "S",
  N = "N",
}

export { Review }
