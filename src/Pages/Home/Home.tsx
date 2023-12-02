import React from "react";
import Header from "./../../Components/Header/Header";
import "./style.css";

function Home() {
  return (
    <>
      <Header />
      <div>
        <div id="imageContainer"></div>

        <div
          className="h-[80vh] flex justify-center mt-10 gap-8 w-[100%]"
          id="container"
        >
          <div
            className="h-[500px] rounded-md border bg-cover bg-center w-[23%] relative"
            id="image1"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Shop Now
              </button>
            </div>
          </div>
          <div
            className="h-[500px] rounded-md border bg-cover bg-center w-[23%] relative"
            id="image2"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300">
                Shop Now
              </button>
            </div>
          </div>
          <div
            className="h-[500px] rounded-md border bg-cover bg-center w-[23%] relative"
            id="image3"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300">
                Shop Now
              </button>
            </div>
          </div>
        </div>
        <div
          className="w-[73%] mx-auto h-[70vh] rounded-md overflow-hidden relative group"
          id="image4"
        >
          <button className="absolute inset-0  text-white px-4 py-2 rounded-md opacity-0 transition-opacity duration-300 group-hover:bg-transparent group-hover:opacity-100">
            SHOP NOW
          </button>
        </div>
      </div>

      <div className="images-container  h-[80vh]  flex justify-center w-[81%] mt-4  mx-auto cursor-pointer ">
      <div className="firstDiv w-[40%] mx-auto relative overflow-hidden">
  <div className="h-full w-full bg-cover bg-center transition-opacity duration-300 hover:opacity-60 hover:backdrop-blur-md">
    {/* Your image content goes here */}
  </div>
  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
      SHOP NOW
    </button>
  </div>
</div>


        <div className="secondDiv  w-[40%] mx-auto  ">
          <div className="innerDiv2 w-[80%] mx-auto pt-[40%]" >
            {/* <div className="h-[10vh]" ></div> */}
            <h1 className="font-bold font-sans text-slate-900 text-center text-xl">
              {" "}
              Cultured Legacy⚡
            </h1>
            <p>
              A year of dedication, countless dreams woven into every stitch, &
              now, our legacy is ready. It's finally time to reveal the
              masterpiece we've been crafting 🥇 Browse the collective today.
            </p>
          </div>
        </div>
      </div>

      <div className="w-[100%] h-[70vh] mt-8">
        <div className="innerHeading w-[70%] text-center mx-auto font-mono ">
          <h1>Top Picks</h1>
          <p className="font-bold font-serif" >Discover a thoughtfully curated selection 
            of the finest articles from Cultured Legacy (Volume III), carefully
             handpicked to showcase the best.</p>
          
          </div>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Home;
