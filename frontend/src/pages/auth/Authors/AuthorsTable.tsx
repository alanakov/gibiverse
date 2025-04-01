import { DashboardTablePagination } from "@/components/custom/DashboardPagination";
import { DashboardTable } from "@/components/custom/DashboardTable";
import React from "react";

interface AuthorsTableProps {
  itemsPerPage?: number;
}

interface Autor {
  id: number;
  nome: string;
  biografia: string;
}

export function AuthorsTable({ itemsPerPage = 10 }: AuthorsTableProps) {
  const autoresMocados: Autor[] = [
    {
      id: 1,
      nome: "Stan Lee",
      biografia:
        "Criador de vários heróis da Marvel. Um dos maiores nomes dos quadrinhos.",
    },
    {
      id: 2,
      nome: "Mauricio de Sousa",
      biografia:
        "Criador da Turma da Mônica. Um ícone dos quadrinhos brasileiros.",
    },
    {
      id: 3,
      nome: "Alan Moore",
      biografia:
        "Autor de Watchmen e V de Vingança. Um dos roteiristas mais influentes.",
    },
    {
      id: 4,
      nome: "Frank Miller",
      biografia:
        "Autor de Batman: Ano Um e Sin City. Um dos nomes mais importantes dos quadrinhos modernos.",
    },
    {
      id: 5,
      nome: "Neil Gaiman",
      biografia:
        "Autor de Sandman e Deuses Americanos. Um dos maiores nomes da fantasia moderna.",
    },
    {
      id: 6,
      nome: "Grant Morrison",
      biografia:
        "Autor de All-Star Superman e Batman Incorporated. Um dos roteiristas mais experimentais.",
    },
    {
      id: 7,
      nome: "Jack Kirby",
      biografia:
        "Co-criador de vários heróis da Marvel. Um dos artistas mais influentes dos quadrinhos.",
    },
    {
      id: 8,
      nome: "Osamu Tezuka",
      biografia:
        "Criador de Astro Boy e Kimba, o Leão Branco. Um dos pais do mangá moderno.",
    },
    {
      id: 9,
      nome: "Rumiko Takahashi",
      biografia:
        "Criadora de Ranma ½ e InuYasha. Uma das mangakás mais populares do mundo.",
    },
    {
      id: 10,
      nome: "Akira Toriyama",
      biografia:
        "Criador de Dragon Ball. Um dos mangakás mais famosos e bem-sucedidos.",
    },
    {
      id: 11,
      nome: "Eiichiro Oda",
      biografia:
        "Criador de One Piece. Um dos mangakás mais populares e influentes da atualidade.",
    },
    {
      id: 12,
      nome: "Hajime Isayama",
      biografia:
        "Criador de Attack on Titan. Um dos mangakás mais aclamados da década.",
    },
    {
      id: 13,
      nome: "Kentaro Miura",
      biografia:
        "Criador de Berserk. Um dos mangakás mais respeitados pela qualidade de sua arte.",
    },
    {
      id: 14,
      nome: "Inio Asano",
      biografia:
        "Autor de Goodnight Punpun e Solanin. Um dos mangakás mais introspectivos e aclamados da atualidade.",
    },
    {
      id: 15,
      nome: "Naoki Urasawa",
      biografia:
        "Autor de Monster e 20th Century Boys. Um dos mangakás mais populares e respeitados do mundo.",
    },
  ];

  const [currentPage, setCurrentPage] = React.useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const autoresPagina = autoresMocados.slice(startIndex, endIndex);
  const totalPages = Math.ceil(autoresMocados.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = React.useMemo(
    () => [
      { key: "nome", label: "Nome" },
      { key: "biografia", label: "Biografia" },
    ],
    [],
  );

  return (
    <div>
      <DashboardTable data={autoresPagina} columns={columns} />
      <DashboardTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
