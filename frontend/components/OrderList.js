import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFullName, setSize, addTopping, removeTopping, resetOrder, setFilterSize } from "../state/orderListSlice";
import { useGetOrderListQuery, useCreatePizzaOrderMutation, useFilterOrderListByPizzaSizeQuery, useUpdatePizzaOrderMutation, useDeletePizzaOrderMutation } from "../state/orderListApi";

export default function OrderList() {
  const dispatch = useDispatch();
  const { data: orders, isLoading: gettingOrders, isFetching: refreshingOrders } = useGetOrderListQuery();
  const [createPizzaOrder, { isLoading: creatingOrder }] = useCreatePizzaOrderMutation();
  const [updatePizzaOrder, { isLoading: updatingOrder }] = useUpdatePizzaOrderMutation();
  const [deletePizzaOrder, { isLoading: deletingOrder }] = useDeletePizzaOrderMutation();

  const filterSize = useSelector((state) => state.orderList.filterSize);

  const filteredOrders = filterSize === "All" ? orders : orders?.filter((order) => order.size === filterSize);

  return (
    <div id="orderList">
      <h2>
        Pizza Orders
        {deletingOrder && " in deletion..."}
        {creatingOrder && " creating order..."}
        {updatingOrder && " updating order..."}
        {(gettingOrders || refreshingOrders) && " loading..."}
      </h2>
      <ol>
        {filteredOrders?.map((order) => (
          <li key={order.id}>
            <div>
              <p>
                {order.customer} ordered a size {order.size} with {order.toppings ? order.toppings.length : "no"} toppings
              </p>
            </div>
          </li>
        )) || "No orders here! Go place some."}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {["All", "S", "M", "L"].map((size) => {
          const className = `button-filter${size === filterSize ? " active" : ""}`;
          return (
            <button data-testid={`filterBtn${size}`} onClick={() => dispatch(setFilterSize(size))} className={className} key={size}>
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
