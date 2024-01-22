export interface INotes {
  id?: string;
  title: string;
  description: string;
  user_id: string;
  created_at?: string | Date;
  updated_at?: string | Date;
}
export interface ILinks {
  id: string;
  url: string;
  note_id: string;
  created_at?: string | Date;
}
export interface ITags {
  id: string;
  name: string;
  note_id: string;
  user_id: string;
}
