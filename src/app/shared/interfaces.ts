export interface regUser {
  firstname: string,
  lastname: string,
  email: string,
  password: string
}

export interface authUser {
  email: string,
  password: string
}

export interface createPost {
  title: string,
  description: string,
  date: string,
  tags?: string,
  image?: File
}

export interface showPost {
  id: number,
  title: string,
  description: string,
  tag_id: Array<Tag>,
  firstname: string,
  lastname: string,
  image_ref: string,
  date: string,
  likes: number,
  haslike: boolean,
  isAuthor: boolean
}

export interface Tag {
  id: number,
  name: string
}


