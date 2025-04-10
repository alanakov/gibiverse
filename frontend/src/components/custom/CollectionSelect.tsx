import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCollections } from "@/hooks/collections/useCollections";

interface CollectionSelectProps {
  value?: number | null; // Changed to make it optional
  onChange: (id: number | null) => void;
}

export function CollectionSelect({ value, onChange }: CollectionSelectProps) {
  const { collections, fetchCollections } = useCollections();
  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    if (collections.length === 0) {
      fetchCollections();
    }
  }, [fetchCollections, collections]);

  useEffect(() => {
    if (value !== null && value !== undefined) {
      const selectedCollection = collections.find(
        (collection) => collection.id === value,
      );
      setSelectedValue(selectedCollection ? String(selectedCollection.id) : "");
    } else {
      setSelectedValue("");
    }
  }, [value, collections]);

  const handleChange = (id: string) => {
    if (id === "") {
      setSelectedValue("");
      onChange(null);
      return;
    }
    setSelectedValue(id);
    onChange(Number(id));
  };

  return (
    <div>
      <label className="mb-1 block text-sm text-zinc-200">Coleção</label>
      <Select value={selectedValue} onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione uma coleção">
            {collections.find(
              (collection) => String(collection.id) === selectedValue,
            )?.name || "Selecione uma coleção"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Nenhuma coleção</SelectItem>
          {collections.map((collection) => (
            <SelectItem key={collection.id} value={String(collection.id)}>
              {collection.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
