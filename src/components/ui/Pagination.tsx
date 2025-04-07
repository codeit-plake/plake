import clsx from "clsx";

interface IPaginationProps {
  totalPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const MAX_PAGE_COUNT = 5;

const Pagination = ({
  totalPage,
  currentPage,
  onPageChange,
}: IPaginationProps) => {
  let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_COUNT / 2));
  const endPage = Math.min(totalPage, startPage + MAX_PAGE_COUNT - 1);

  // 마지막 페이지에 가까워졌을 때 startPage를 조정
  if (endPage === totalPage) {
    startPage = Math.max(1, totalPage - MAX_PAGE_COUNT + 1);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  if (totalPage === 0) return null;

  return (
    <section className="flex w-full items-center justify-center gap-2">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>{"<"}</button>
      )}
      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)}>1</button>
          {startPage > 2 && <span>{"..."}</span>}
        </>
      )}
      {pageNumbers.map(page => (
        <button
          key={page}
          onClick={() => {
            if (page !== currentPage) onPageChange(page);
          }}
          className={clsx(
            "rounded-md px-3 py-1",
            page === currentPage ? "bg-gray-200" : "hover:bg-gray-100",
          )}
        >
          {page}
        </button>
      ))}
      {endPage < totalPage && (
        <>
          {endPage < totalPage - 1 && <span>{"..."}</span>}
          <button onClick={() => onPageChange(totalPage)}>{totalPage}</button>
        </>
      )}
      {currentPage < totalPage && (
        <button onClick={() => onPageChange(currentPage + 1)}>{">"}</button>
      )}
    </section>
  );
};

export default Pagination;
