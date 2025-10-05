import Image from "next/image";
import Products from "./(pages)/products/page";
import MainSlider from "@/components/mainSlider/mainSlider";

export default function Home() {


   
  return (
   
   <>
   <div className="w-full mb-20">
 <MainSlider/>
   </div>
  
    <Products/>
   </>
   
  );
}
