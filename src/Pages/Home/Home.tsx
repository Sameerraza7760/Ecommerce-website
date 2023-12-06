import { SettingOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useState } from "react";
import Footer from "./../../Components/Footer/Footer";
import Header from "./../../Components/Header/Header";
import "./style.css";
const { TextArea } = Input;

import type { CollapseProps } from "antd";
import { Card, Collapse, Select } from "antd";

const { Meta } = Card;

const { Option } = Select;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

type ExpandIconPosition = "start" | "end";

function Home() {
  const [expandIconPosition, setExpandIconPosition] =
    useState<ExpandIconPosition>("start");

  const onPositionChange = (newExpandIconPosition: ExpandIconPosition) => {
    setExpandIconPosition(newExpandIconPosition);
  };

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const genExtra = () => (
    <SettingOutlined
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "What are the Delevery Charges",
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: "2",
      label: "What is the return policy",
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: "3",
      label: "What are the Payment method",
      children: <div>{text}</div>,
      extra: genExtra(),
    },
  ];
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
          <div className="innerDiv2 w-[80%] mx-auto pt-[40%]">
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

      <div className="cardContainer  w-[100%] h-auto mt-8">
        <div className="innerHeading w-[70%] text-center mx-auto font-mono ">
          <h1>Top Picks</h1>
          <p className="font-bold font-serif">
            Discover a thoughtfully curated selection of the finest articles
            from Cultured Legacy (Volume III), carefully handpicked to showcase
            the best.
          </p>
        </div>
        <div className="w-[100%] flex flex-wrap justify-center gap-5">
          <div className="w-[100%] flex flex-wrap justify-center gap-5">
            <Card
              className="w-48 h-74"
              hoverable
              cover={<img alt="example" src="" id="card1" />}
            >
              <Meta title="Dark blue Polo" description="www.instagram.com" />
            </Card>
            <Card
              className="w-48 h-74"
              hoverable
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  id="card2"
                />
              }
            >
              <Meta
                title="Men's Cable Knit Crew Neck Aran Wool Sweater [Free Express Shipping]"
                description="www.instagram.com"
              />
            </Card>
            <Card
              className="w-48 h-74"
              hoverable
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  id="card3"
                />
              }
            >
              <Meta
                title="MEN'S NAVY LOOSE FIT T-SHIRT - Stoneharbor.com.pk"
                description="www.instagram.com"
              />
            </Card>
            <Card
              className="w-48 h-74"
              hoverable
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  id="card4"
                />
              }
            >
              <Meta title="Cargo trouser" description="www.instagram.com" />
            </Card>
          </div>
        </div>
      </div>
      <div className="sometext w-full items-center">
        <h1 className="font-serif justify-center text-center font-bold">
          ASK GROOVY:
        </h1>
        <TextArea
          rows={4}
          className="w-[50%] mx-auto items-center justify-center flex"
        />
        <br />
        <br />
      </div>
      <div className="w-[67%] mx-auto items-center h-auto ">
        <h1 className="font-serif">FAQ'S</h1>
        <Collapse
          defaultActiveKey={["1"]}
          onChange={onChange}
          expandIconPosition={expandIconPosition}
          items={items}
        />
        <br />
      </div>

      <div className="outerCardDiv w-full h-auto">
        <div className="innerCardDiv w-[50%] mx-auto h-[50%] bg-slate-300 shadow-md p-[25px] text-center ">
          <span className="material-icons-sharp icon-xl text-secondary icon-image  "></span>
          <h1 className="text-xl font-serif "> Didn't find your answer?</h1>
          <p className="font-serif">
            Our customer service will be happy to help you.
          </p>
          <button className="h-[50px] w-[200px] text-grey-900 font-bold mt-2 bg-slate-50 rounded-md shadow-md ">
            Get in Touch
          </button>
        </div>
      </div>
      <div>
        <div>
          <span>
            <img src="" alt="" id="instaID" />
          </span>
          <h1 className="text-xl mx-auto text-center font-serif">
            From our Instagram
          </h1>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
