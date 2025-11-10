"use client";

import useOrders from "@/app/hooks/useOrders";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@/i18n/navigation";
import Loading from "@/Loading";
import { useTranslations } from "next-intl";

export default function OrdersPage() {
  const t = useTranslations("OrdersPage");
  const { orders, loading } = useOrders();
  const totalAmount = orders
    .reduce((sum, order) => (sum += order.total_price), 0)
    .toFixed(2);

  return (
    <main className="flex flex-col gap-10 justify-center items-center">
      <h1 className="text-4xl md:text-6xl text-center mt-5 max-w-[800px] font-semibold leading-[120%]">
        {t("header")}
      </h1>

      <div className="flex flex-col gap-4 w-full">
        {loading ? (
          <Loading />
        ) : (
          <Table className="w-full border border-[#665f55] rounded-lg overflow-hidden shadow">
            <TableHeader className="bg-[#665f55] max-md:text-sm text-[#e1d4c9]">
              <TableRow className="border-[#665f55]">
                <TableHead className="font-semibold px-4 py-3 w-[25%]">
                  ID
                </TableHead>
                <TableHead className="font-semibold px-4 py-3 w-[25%]">
                  {t("TableHeaders.date")}
                </TableHead>
                <TableHead className="font-semibold px-4 py-3 w-[25%]">
                  {t("TableHeaders.details")}
                </TableHead>
                <TableHead className="font-semibold px-4 py-3 text-right w-[25%]">
                  {t("TableHeaders.amount")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  className="border-[#c1b6ad] dark:border-[#665f55]"
                >
                  <TableCell className="px-4 py-3 w-[25%] font-medium border-none">
                    {order.id}
                  </TableCell>
                  <TableCell className="px-4 py-3 w-[25%]">
                    {new Date(order.created_at as string)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, ".")}
                  </TableCell>
                  <TableCell className="px-4 py-3 w-[25%]">
                    <Link
                      className="relative group hover:text-accent transition-all duration-300"
                      href={`/orders/${order.id}`}
                    >
                      <span className="font-medium text-accent">
                        {t("view")}
                      </span>
                      <span className="absolute -bottom-1 rounded-2xl left-0 w-full h-0.5 bg-accent scale-x-0 transition-all duration-400 group-hover:scale-x-100"></span>
                    </Link>
                  </TableCell>
                  <TableCell className="px-4 py-3 w-[25%] text-right">
                    ${order.total_price.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="border-[#665f55]">
              <TableRow className="">
                <TableCell colSpan={3} className="font-semibold">
                  {t("total")}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  ${totalAmount}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </div>
    </main>
  );
}
