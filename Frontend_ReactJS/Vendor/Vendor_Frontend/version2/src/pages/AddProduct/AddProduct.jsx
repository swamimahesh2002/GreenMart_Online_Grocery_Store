import "./AddProduct.scss";
import { useState } from "react";
import { myAxios, myAxiosHeader } from '../../makerequest'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { getAuthData } from "../../store/Auth";

export const AddProduct = () => {

    const user = getAuthData();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [rate, setRate] = useState("");
    const [image, setImage] = useState("");
    const [expDate, setExpDate] = useState("");
    const [qty, setQty] = useState("");

    var cat = 0;

    const { register, handleSubmit, formState: { errors } } = useForm();

    const optionOnChangehadler = (event) => {
        const option = event.target.value;
        if (option === "1") {
            cat = parseInt(option);
        } else if (option === "2") {
            cat = parseInt(option);
        } else if (option === "3") {
            cat = parseInt(option);
        } else if (option === "4") {
            cat = parseInt(option);
        } else if (option === "5") {
            cat = parseInt(option);
        } else {
            cat = parseInt(option);
        }
    }

    const addProduct = (event) => {
        //event.preventDefault();
        //debugger;
        myAxiosHeader
            .post(
                `vendor/add-product=${cat}/${user.id}`,
                {
                    productName: name,
                    productDescription: description,
                    rate: rate,
                    image: image,
                    expiryDate: expDate,
                    productQuantity: qty,
                },
                // {
                //   headers: {
                //     Authorization:
                //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiaGltYW5zaHVAMTIzIiwiZXhwIjoxNjc4MDQ3MjM4LCJpYXQiOjE2NzgwMTEyMzh9.598px0E1zpxFQ9M3-vK4qgPnSCdzrpN_lq5toSGbH6s",
                //   },
                // }
            )
            .then((response) => {
                console.log("added pdt");
                setName("");
                setRate("");
                setDescription("");
                setExpDate("");
                setImage("");
                setQty("");
                toast.success("Added successfully!!!");
            });
    };



    return (
        <form onSubmit={handleSubmit(addProduct)}>
            <div className="add">
                <div className="name">
                    <input
                        type="text"
                        value={name}
                        name=""
                        placeholder="* Enter name here"
                        {...register("name", { required: true })}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    {errors.name && <p style={{ color: "red", fontSize: "13px" }}>Please enter name</p>}
                </div>
                <br></br>
                <div className="desc">
                    <input
                        type="text"
                        name=""
                        placeholder="* Enter description here"
                        value={description}
                        {...register("desc", { required: true })}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                    {errors.desc && <p style={{ color: "red", fontSize: "13px" }}>Please enter description</p>}
                </div>
                <br></br>
                <div className="rate">
                    <input
                        type="text"
                        name=""
                        value={rate}
                        placeholder="* Enter price here"
                        {...register("rate", { required: true })}
                        onChange={(e) => {
                            setRate(e.target.value);
                        }}
                    />
                    {errors.rate && <p style={{ color: "red", fontSize: "13px" }}>Please enter price</p>}
                </div>
                <br></br>
                <div className="expDate">
                    <input
                        type="date"
                        name=""
                        value={expDate}
                        placeholder="* Enter date here (YYYY/MM/DD)"
                        {...register("expDate", { required: true })}
                        onChange={(e) => {
                            setExpDate(e.target.value);
                        }}
                    />
                    {errors.expDate && <p style={{ color: "red", fontSize: "13px" }}>Please enter expiry date</p>}
                </div>
                <br></br>
                <div className="qty">
                    <input
                        type="number"
                        name=""
                        value={qty}
                        placeholder="* Enter quantity here"
                        {...register("qty", { required: true })}
                        onChange={(e) => {
                            setQty(e.target.value);
                        }}
                    />
                    {errors.qty && <p style={{ color: "red", fontSize: "13px" }}>Please enter quantity</p>}
                </div>
                <br></br>
                <div className="img">
                    <input
                        type="text"
                        name=""
                        id=""
                        value={image}
                        placeholder="* Enter image here"
                        {...register("img", { required: true })}
                        onChange={(e) => {
                            setImage(e.target.value);
                        }}
                    />
                    {errors.img && <p style={{ color: "red", fontSize: "13px" }}>Please upload image</p>}
                </div>
                <br></br>
                <div className="day">
                    <select className="option"
                        {...register("cat", { required: true })}
                        onChange={optionOnChangehadler} >
                        <option value="0">Select category</option>
                        <option value="1">Fruits</option>
                        <option value="2">Vegetables</option>
                        <option value="3">Sprouts</option>
                        <option value="4">Herbs & Seasonings</option>
                        <option value="5">Dairy</option>
                    </select>
                    {errors.cat && <p style={{ color: "red", fontSize: "13px" }}>Please select category</p>}
                </div>
                <br></br>
                <div className="btn">
                    <button type="submit">Add Product</button>
                </div>
            </div>
        </form>
    )
};
