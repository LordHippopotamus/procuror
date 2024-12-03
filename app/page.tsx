import { prisma } from "@/prisma";
import Link from "next/link";
import FiltersPanel from "@/components/FiltersPanel";
import Pagination from "@/components/Pagination";

const Home = async (props: {
  searchParams: Promise<{
    title?: string;
    dateMin?: string;
    dateMax?: string;
    page?: string;
  }>;
}) => {
  const itemsPerPage = 20;

  const searchParams = await props.searchParams;

  const filters = {
    title: {
      search: searchParams.title,
    },
    timestamp: {
      gte: searchParams.dateMin && new Date(searchParams.dateMin).toISOString(),
      lte: searchParams.dateMax && new Date(searchParams.dateMax).toISOString(),
    },
  };

  const count = await prisma.document.count({
    where: filters,
  });
  const documents = await prisma.document.findMany({
    select: { id: true, title: true, timestamp: true },
    orderBy: { timestamp: "desc" },
    where: filters,
    skip: Number(searchParams.page) * itemsPerPage || 0,
    take: itemsPerPage,
  });

  return (
    <div>
      <h1>Панель управления</h1>
      <h2>Документы</h2>
      <span>
        Найдено <b>{count}</b> документов
      </span>
      <FiltersPanel />
      <ul>
        {documents.map((el) => (
          <li key={el.id}>
            <h3>{el.title}</h3>
            <span>{el.timestamp.toLocaleDateString()}</span>
            <Link href={"/" + el.id}>
              <button>Подробнее</button>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination maxPages={Math.ceil(count / itemsPerPage)} />
    </div>
  );
};

export default Home;
