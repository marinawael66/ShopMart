import { removeItemFromWishlistAction } from "@/app/_actions/removeFromWishlist.action";
import { WhishlistContext } from "@/components/context/wishlistContext";
import { useContext, useState } from "react";

export function useRemoveWishlistProduct(){
    const{setwishlistData} =useContext(WhishlistContext);
      const [removingItem, setRemovingItem] = useState<string | null>(null);

      async function moveToCart(productid:string) {

        setRemovingItem(productid);
        const data = await removeItemFromWishlistAction(productid);
        if (data.status == "success") {
    //   toast.success("Product Removed Successfully");
      setwishlistData(data);
      setRemovingItem(null);
    }

      }
       return {
    moveToCart,
    removingItem,
  };

}