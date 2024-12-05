import { prisma } from "@/prisma";
import Link from "next/link";
import FiltersPanel from "@/components/FiltersPanel";
import Pagination from "@/components/Pagination";
import { auth } from "@/auth";
import { Button } from "@headlessui/react";

const Home = async (props: {
  searchParams: Promise<{
    title?: string;
    dateMin?: string;
    dateMax?: string;
    page?: string;
  }>;
}) => {
  const session = await auth();
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
    skip: Number(searchParams.page)
      ? (Number(searchParams.page) - 1) * itemsPerPage
      : 0,
    take: itemsPerPage,
  });

  return (
    <>
      <div className="mb-4 flex flex-col justify-end">
        <h2 className="font-bold text-4xl">Документы</h2>
        {count % 10 === 1 && (
          <span>
            Найден <b>{count}</b> документ
          </span>
        )}
        {count % 10 >= 2 && count % 10 <= 4 && (
          <span>
            Найдено <b>{count}</b> документа
          </span>
        )}
        {(count % 10 >= 5 && count % 10 <= 9) ||
          (count % 10 == 0 && (
            <span>
              Найдено <b>{count}</b> документов
            </span>
          ))}
      </div>
      <FiltersPanel />
      {session?.user && (
        <Link href="/create">
          <Button className="mt-4 p-4 bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-slate-100 transition rounded w-full">
            Создать документ
          </Button>
        </Link>
      )}
      {!count && (
        <p className="font-bold text-lg mt-4 text-center">
          По вашему запросу ничего не найдено
        </p>
      )}
      <ul className="flex flex-col gap-2 my-4">
        {documents.map((el) => (
          <Link href={"/" + el.id} key={el.id}>
            <li className="bg-slate-200 shadow-xl p-4 rounded-lg hover:bg-slate-300 active:bg-slate-400 cursor-pointer">
              <h3>{el.title}</h3>
              <span className="font-bold tracking-widest">
                {el.timestamp.toLocaleDateString()}
              </span>
            </li>
          </Link>
        ))}
      </ul>
      <Pagination maxPages={Math.ceil(count / itemsPerPage)} />
    </>
  );
};

export default Home;
