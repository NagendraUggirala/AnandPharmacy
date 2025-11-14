import React from "react";

const CartBadge = ({ count }) => {
  if (!count || count === 0) return null;

  return (
    <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs px-[6px] py-[1px] rounded-full">
      {count}
    </span>
  );
};

export default CartBadge;
