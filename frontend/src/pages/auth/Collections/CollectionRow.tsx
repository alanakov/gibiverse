import { CollectionActions } from "./CollectionActions";
import { TableCell, TableRow } from "@/components/ui/table";
import { Collection as BaseCollection } from "@/types/collection";
import { useEffect, useState } from "react";
import { useAuthors } from "@/hooks/authors/useAuthors";

interface Collection extends BaseCollection {
  authorId: number;
}

interface CollectionRowProps {
  collection: Collection;
  onEdit?: (collection: Collection) => void;
  onDelete?: (id: number) => void;
}

export function CollectionRow({
  collection,
  onEdit,
  onDelete,
}: CollectionRowProps) {
  const [authorName, setAuthorName] = useState<string>("-");
  const { authors, fetchAuthors } = useAuthors();

  useEffect(() => {
    fetchAuthors();
  }, []);

  useEffect(() => {
    const author = authors.find((author) => author.id === collection.authorId);
    setAuthorName(author?.name || "-");
  }, [collection, authors]);

  return (
    <TableRow className="hover:bg-zinc-800">
      <TableCell className="w-[200px] max-w-[200px] truncate overflow-hidden whitespace-nowrap">
        {collection.name}
      </TableCell>
      <TableCell className="w-[300px] max-w-[300px] truncate overflow-hidden whitespace-nowrap">
        {collection.description}
      </TableCell>
      <TableCell className="w-[200px] max-w-[200px] truncate overflow-hidden whitespace-nowrap">
        {authorName}
      </TableCell>
      <TableCell className="w-[100px] text-center">
        <CollectionActions
          collection={collection}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}
