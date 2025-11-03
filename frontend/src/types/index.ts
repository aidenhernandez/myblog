// User Types
export interface User {
  id: number;
  username: string;
  email: string;
  display_name: string;
  bio?: string;
  profile_picture_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  token: string;
  refresh_token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  display_name: string;
}

// Post Types
export interface Post {
  id: number;
  author_id: number;
  author: User;
  title: string;
  content: string;
  cover_image_url?: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
  published_at?: string;
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
  tags: Tag[];
}

export interface CreatePostRequest {
  title: string;
  content: string;
  cover_image_url?: string;
  status: 'draft' | 'published';
  tags: string[];
}

export interface UpdatePostRequest extends CreatePostRequest {
  id: number;
}

// Comment Types
export interface Comment {
  id: number;
  post_id: number;
  author_id: number;
  author: User;
  content: string;
  parent_comment_id?: number;
  created_at: string;
  updated_at: string;
  replies?: Comment[];
}

export interface CreateCommentRequest {
  post_id: number;
  content: string;
  parent_comment_id?: number;
}

// Like Types
export interface Like {
  id: number;
  post_id: number;
  user_id: number;
  created_at: string;
}

// Follow Types
export interface Follow {
  id: number;
  follower_id: number;
  following_id: number;
  created_at: string;
}

// Tag Types
export interface Tag {
  id: number;
  name: string;
  slug: string;
  created_at: string;
}

// Notification Types
export interface Notification {
  id: number;
  user_id: number;
  type: 'like' | 'comment' | 'follow' | 'reply';
  actor: User;
  post?: Post;
  comment?: Comment;
  is_read: boolean;
  created_at: string;
}

// Pagination Types
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

// API Error Types
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
}
