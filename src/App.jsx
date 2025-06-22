import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import bg1 from "./assets/bg1.png";
import bg2 from "./assets/bg2.png";
import bg3 from "./assets/bg3.png";
import bg4 from "./assets/bg4.png";
import logo from "./assets/logo.png";
import p1 from "./assets/p1.png";
import p2 from "./assets/p2.png";
import p3 from "./assets/p3.png";
import p4 from "./assets/p4.png";
import s1 from "./assets/s1.png";
import s2 from "./assets/s2.png";
import s3 from "./assets/s3.png";
import { Button, Input, Modal } from "antd";

function App() {
  let api = "https://6821ee2fb342dce8004c65ef.mockapi.io/dataUsers";
  let [data, setData] = useState([]);
  let [addDialog, setAddDailog] = useState(false);
  let [inpName, setInpName] = useState("");
  let [inpImage, setInpImage] = useState("");
  let [inpPrice, setInpPrice] = useState("");

  let [EditDialog, setEditDailog] = useState(false);
  let [EditinpName, setEditInpName] = useState("");
  let [EditinpImage, setEditInpImage] = useState("");
  let [EditinpPrice, setEditInpPrice] = useState("");
  let [idx, setIdx] = useState(null);

  async function get() {
    try {
      let response = await fetch(api);
      let data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    get();
  }, []);

  async function deletUser(id) {
    try {
      await fetch(`${api}/${id}`, {
        method: "DELETE",
      });
      get();
    } catch (error) {
      console.error(error);
    }
  }

  function closeEdit() {
    setEditDailog(false);
  }
  function handleCancel() {
    setAddDailog(false);
  }

  async function addNewUser() {
    try {
      let newUser = {
        name: inpName,
        price: `$ ${inpPrice}`,
        image: inpImage,
        id: Date.now().toString(),
      };
      await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      setAddDailog(false);
      get();
    } catch (error) {
      console.error(error);
    }
  }

  async function openEdit(e) {
    setEditInpImage(e.image);
    setEditInpName(e.name);
    setEditInpPrice(e.price);
    setIdx(e.id);
    setEditDailog(true);
  }

  async function editUser() {
    try {
      let updateUser = {
        name: EditinpName,
        image: EditinpImage,
        price: EditinpPrice,
      };
      await fetch(`${api}/${idx}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateUser),
      });
      setEditDailog(false);
      get();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <header className="w-full h-[75px] flex items-center bg-white justify-around">
        <div className="flex items-center gap-[30px] font-[500] text-[14px]">
          <p>Shop</p>
          <p>Explore</p>
        </div>
        <img className="hidden lg:block" src={logo} alt="" />
        <p className="text-[14px] font-[500]">My Cart</p>
      </header>

      <section
        className="bg-no-repeat w-full h-[350px] sm:h-[504px] flex items-center justify-center bg-center bg-cover"
        style={{ backgroundImage: `url(${bg1})` }}
      >
        <article className="w-[90%] max-w-[450px] h-[120px] flex flex-col items-center justify-between text-white text-center sm:text-left">
          <p className="text-[28px] sm:text-[43px]">The Desk Shelf System</p>
          <p className="text-[13px] sm:text-[15px]">
            Available in Walnut or Maple
          </p>
          <p className="text-[13px]">LEARN MORE</p>
        </article>
      </section>

      <div className="w-[90%] max-w-[580px] h-[130px] m-auto flex flex-col items-center justify-between my-[80px] text-center sm:text-left">
        <p className="text-[32px] sm:text-[43px]">Design Inspires</p>
        <p className="text-[#A0A0A0] text-sm sm:text-base">
          Build your dream workspace, so you can get your best work done.
        </p>
        <p className="text-[13px]">GET STARTED</p>
      </div>

      <section className="w-full max-w-[1380px] m-auto flex flex-col sm:flex-row items-center sm:items-start justify-between gap-10 sm:gap-0">
        <article className="w-full sm:w-[682px] h-[400px] sm:h-[570px] flex flex-col items-center justify-start gap-5">
          <img
            src={s1}
            alt=""
            className="w-full h-auto max-h-[400px] object-contain"
          />
          <p className="text-[22px] sm:text-[27px]">Desk Pads</p>
          <p className="text-[13px]">LEARN MORE</p>
        </article>
        <article className="w-full sm:w-[682px] h-[400px] sm:h-[570px] flex flex-col items-center justify-start gap-5">
          <img
            src={s2}
            alt=""
            className="w-full h-auto max-h-[400px] object-contain"
          />
          <p className="text-[22px] sm:text-[27px]">Laptop Stands</p>
          <p className="text-[13px]">LEARN MORE</p>
        </article>
      </section>

      <div className="w-[90%] max-w-[580px] h-[130px] m-auto flex flex-col items-center justify-between my-[80px] text-center sm:text-left">
        <p className="text-[32px] sm:text-[43px]">Featured Products</p>
        <p className="text-[#A0A0A0] text-sm sm:text-base">
          See What’s Trending Right Now
        </p>
        <p className="text-[50px]">...</p>
      </div>

      <Modal
        title="Add Product"
        closable={{ "aria-label": "Custom Close Button" }}
        open={addDialog}
        onOk={addNewUser}
        onCancel={handleCancel}
      >
        <Input
          value={inpImage}
          onChange={(e) => setInpImage(e.target.value)}
          placeholder="Url Image..."
        />
        <br />
        <br />
        <Input
          value={inpName}
          onChange={(e) => setInpName(e.target.value)}
          placeholder="Name..."
        />
        <br />
        <br />
        <Input
          value={inpPrice}
          onChange={(e) => setInpPrice(e.target.value)}
          placeholder="Price..."
        />
      </Modal>

      <Modal
        title="Edit Product"
        closable={{ "aria-label": "Custom Close Button" }}
        open={EditDialog}
        onOk={editUser}
        onCancel={closeEdit}
      >
        <Input
          value={EditinpImage}
          onChange={(e) => setEditInpImage(e.target.value)}
          placeholder="Url Image..."
        />
        <br />
        <br />
        <Input
          value={EditinpName}
          onChange={(e) => setEditInpName(e.target.value)}
          placeholder="Name..."
        />
        <br />
        <br />
        <Input
          value={EditinpPrice}
          onChange={(e) => setEditInpPrice(e.target.value)}
          placeholder="Price..."
        />
      </Modal>

      <Button
        type="primary"
        onClick={() => setAddDailog(true)}
        className="my-5 ml-[100px] block w-[90%] max-w-[200px] lg:ml-[660px]"
      >
        Add Product
      </Button>

      <section className="flex flex-wrap justify-center gap-8 w-[90%] max-w-[1380px] m-auto">
        {data.map((e) => (
          <div
            key={e.id}
            className="flex flex-col gap-3 items-center sm:items-start max-w-[311px]"
          >
            <img
              src={e.image}
              alt=""
              className="w-full h-[435px] object-cover rounded"
            />
            <p className="text-[#A0A0A0] text-sm">{e.name}</p>
            <p className="text-[#A0A0A0] text-sm">{e.price}</p>

            <div className="w-full bg-amber-100 h-[50px] flex items-center justify-around">
              <Button type="primary" danger onClick={() => deletUser(e.id)}>
                Delete
              </Button>

              <Button type="primary" onClick={() => openEdit(e)}>
                Edit
              </Button>
            </div>
          </div>
        ))}
      </section>

      <section
        className="bg-no-repeat w-full h-[350px] sm:h-[504px] flex items-center justify-center bg-center bg-cover my-[80px]"
        style={{ backgroundImage: `url(${bg2})` }}
      >
        <article className="flex flex-col items-center justify-between text-white text-center max-w-[90%] sm:max-w-[700px]">
          <p className="text-[30px] lg:text-[66px]">Home Office Inspiration</p>
          <p className="text-[12px] lg:text-[15px]">
            Working from home can be a challenge—see some creative solutions to
            get it just right.
          </p>
          <p className="text-[13px]">LEARN MORE</p>
        </article>
      </section>

      <div className="w-[90%] max-w-[777px] h-auto text-center m-auto flex flex-col items-center justify-between my-[80px]">
        <p className="text-[32px] sm:text-[43px]">Made The Hard Way</p>
        <p className="text-[#A0A0A0] text-sm sm:text-base">
          Our signature craftsmanship has been honed over a decade of
          manufacturing innovation here in Portland, Oregon. We combine the
          skills of our small in-house team with the collective strength of
          collaborators throughout the US to deliver quality products worth
          investing in.
        </p>
      </div>
      <img className="m-auto max-w-full h-auto" src={bg3} alt="" />
      <div className="w-[90%] max-w-[777px] h-auto text-center m-auto flex flex-col items-center justify-between my-[80px]">
        <p className="text-[32px] sm:text-[43px]">Make Work Meaningful</p>
        <p className="text-[#A0A0A0] text-sm sm:text-base">
          We're here because we believe that your work deserves the best. A team
          that loves working together <br /> is the magic that makes it all
          happen.
        </p>
      </div>
      <img className="m-auto max-w-full h-auto" src={bg4} alt="" />
      <div className="w-[90%] max-w-[777px] h-auto text-center m-auto flex flex-col items-center justify-between my-[80px]">
        <p className="text-[32px] sm:text-[43px]">We Hope You'll Join Us</p>
        <p>READ MORE ABOUT OUR STORY</p>
      </div>

      <section className="w-full max-w-[1340px] text-white bg-[#9AA8B1] justify-center gap-5 m-auto flex flex-col items-center h-[404px]">
        <img src={s3} alt="" />
        <p className="text-[32px] sm:text-[43px]">Design Inspires</p>
        <p className="text-center sm:text-left max-w-[90%] sm:max-w-[500px]">
          Build your dream workspace, so you can get your best work done.
        </p>
      </section>

      <footer className="w-full flex flex-col items-center bg-[#F9F9F9] mt-12 relative pt-6 pb-10">
        <section className="w-[90%] max-w-[1340px] flex flex-col sm:flex-row items-start gap-10 sm:gap-20">
          <div className="text-[18px] flex flex-col gap-2">
            <p>Shop</p>
            <p>About</p>
            <p>Journal</p>
            <p>Support</p>
            <p>COVID-19 Info</p>
            <p>Order Status</p>
            <p>Corporate Sales</p>
          </div>
          <div className="w-full sm:w-[348px] border-b-2 pb-4">
            <p className="text-[22px]">Newsletter Signup</p>
            <p className="text-[#A0A0A0] text-sm">
              Sign up to our Newsletter to hear about new <br /> product
              releases, learn about our design process, and everything else
              going on behind the scenes at Grovemade.
            </p>
          </div>
          <div className="bg-black w-[80px] h-[80px] text-white flex items-center justify-center absolute top-0 right-6 cursor-pointer">
            <p className="text-center leading-tight">
              GO <br />
              UP
            </p>
          </div>
        </section>
        <div className="w-[90%] max-w-[1080px] h-[53px] gap-6 flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-end text-[#707A7F] mt-8 text-sm">
          <p>©2020 Grovemade</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
          <p className="text-black cursor-pointer">Site by Department</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
