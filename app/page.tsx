import { prisma } from "@/prisma";
import Link from "next/link";
import FiltersPanel from "@/components/FiltersPanel";
import Pagination from "@/components/Pagination";
import { auth } from "@/auth";
import Button from "@/components/ui/Button";

function getStringWithNoun(
  number: number,
  one: string,
  two: string,
  five: string
) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}

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
        <h2 className="font-light text-4xl text-amber-950 uppercase tracking-widest">
          Новости
        </h2>
        <span>
          {getStringWithNoun(
            count,
            `Найдена ${count} новость`,
            `Найдено ${count} новости`,
            `Найдено ${count} новостей`
          )}
        </span>
      </div>

      <FiltersPanel />
      {session?.user && (
        <Link href="/create">
          <Button className="my-4 w-full">Создать документ</Button>
        </Link>
      )}
      {!count && (
        <p className="font-bold text-lg mt-4 text-center text-amber-950 uppercase">
          По вашему запросу ничего не найдено
        </p>
      )}
      <ul className="flex flex-col gap-4 my-4">
        {documents.map((el) => (
          <Link href={"/" + el.id} key={el.id}>
            <li className="cursor-pointer">
              <h3 className="font-bold text-amber-950 uppercase">
                {el.title.length > 160
                  ? el.title.slice(1, 157) + "..."
                  : el.title}
              </h3>
              <span className="text-sm">
                {el.timestamp.toLocaleDateString("ru-RU")}
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
