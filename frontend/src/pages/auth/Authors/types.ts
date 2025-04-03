export interface Author {
  id: number;
  name: string;
  bio: string;
}

export interface AuthorsTableProps {
  authors: Author[];
  onDelete: (id: number) => void;
  onEdit: (author: Author) => void;
}
