import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useAppSelector } from "../../hooks";
import { createOrder } from "../../services/apiRestaurant";
import store from "../../store";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { orderSchema } from "../../validators/orderSchema";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import ErrorFormMessage from "./ErrorFormMessage";

export type OrderFormData = z.infer<typeof orderSchema>;

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const { username } = useAppSelector((state) => state.user);
  const cart = useAppSelector(getCart);
  const totalCartPrice = useAppSelector(getTotalCartPrice);
  const navigate = useNavigate();

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({ resolver: zodResolver(orderSchema) });
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data: OrderFormData) => {
    try {
      setSubmitting(true);
      const order = {
        ...data,
        cart,
      };
      const newOrder = await createOrder(order);

      store.dispatch(clearCart());
      navigate(`/order/${newOrder.id}`);
    } catch (e) {
      setSubmitting(false);
      console.log(e);
    }
  });

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow relative">
            <input
              className="input w-full"
              type="text"
              defaultValue={username}
              {...register("customer")}
              required
            />
            <ErrorFormMessage>{errors.customer?.message}</ErrorFormMessage>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow relative">
            <input
              className="input w-full"
              type="tel"
              {...register("phone")}
              required
            />
            <ErrorFormMessage>{errors.phone?.message}</ErrorFormMessage>
          </div>
        </div>

        <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow relative">
            <input
              className="input w-full"
              type="text"
              {...register("address")}
              required
            />
            <ErrorFormMessage>{errors.address?.message}</ErrorFormMessage>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            id="priority"
            checked={withPriority}
            {...register("priority")}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <Button type="primary">
          {isSubmitting
            ? "Placing order...."
            : `Order now from ${formatCurrency(totalPrice)}`}
        </Button>
      </form>
    </div>
  );
}

export default CreateOrder;
