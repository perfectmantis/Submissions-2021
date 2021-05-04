import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import {default_products} from '../../utils/constants'
export default function MPagination({
  currentPage,
  products_total,
  onChangePage,
}) {
  return (
    <div>
      <Pagination
        shape={"rounded"}
        size={"small"}
        page={currentPage}
        onChange={(data, page) => onChangePage(page)}
        count={Math.ceil(products_total / default_products)}
      />
    </div>
  );
}
