import { Collection } from "@/types/collection";
import { CollectionActions } from "./CollectionActions";
import { TableCell, TableRow } from "@/components/ui/table";

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
  return (
    <TableRow className="hover:bg-zinc-800">
      <TableCell>{collection.name}</TableCell>
      <TableCell>{collection.description}</TableCell>
      <TableCell className="text-center">
        <CollectionActions
          collection={collection}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}
