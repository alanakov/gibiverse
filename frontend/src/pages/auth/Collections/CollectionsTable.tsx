import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CollectionRow } from "./CollectionRow";
import { Collection } from "@/types/collection";

interface CollectionsTableProps {
  collections: Collection[];
  onDelete?: (id: number) => void;
  onEdit?: (collection: Collection) => void;
  currentPage?: number;
}

export function CollectionsTable({
  collections,
  onDelete,
  onEdit,
  currentPage,
}: CollectionsTableProps) {
  const hasCollections = collections.length > 0;

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hasCollections ? (
            collections.map((collection) => (
              <CollectionRow
                key={collection.id}
                collection={collection}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Nenhuma coleção foi encontrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {currentPage && (
        <p className="text-muted-foreground mt-4 text-sm">
          Exibindo página {currentPage}
        </p>
      )}
    </div>
  );
}
