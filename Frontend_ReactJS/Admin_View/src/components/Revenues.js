import React, { useState } from 'react';
// import { Revenues} from './Revenues'
import { myAxios } from './makerequest'
import './Revenues.scss'

export const Revenues = () => {

    const [earning, setEarning] = useState([]);
    let month = 1;
    let year = 2023;

    const monthChangehadler = (event) => {
        month = parseInt(event.target.value);
        myAxios.get(`admin/revenue/1/month=${month}`).then((response) => {
            setEarning(response.data);
        });
    }

    const yearChangehadler = (event) => {
        year = parseInt(event.target.value);
        myAxios.get(`admin/revenue/1/yearly=${year}`).then((response) => {
            setEarning(response.data);
        });
    }

    const optionOnChangehadler = (event) => {
        const option = event.target.value;
        if (option === "01") {
            myAxios.get("admin/revenue/1").then((response) => {
                setEarning(response.data);
                document.getElementById("month").disabled = true;
                document.getElementById("year").disabled = true;
            });
        } else if (option === "02") {
            myAxios.get("admin/revenue/1/month=1").then((response) => {
                setEarning(response.data);
                debugger;
                document.getElementById("month").disabled = false;
                document.getElementById("year").disabled = true;
            });
        } else {
            myAxios.get("admin/revenue/1/yearly=2023").then((response) => {
                setEarning(response.data);
                document.getElementById("year").disabled = false;
                document.getElementById("month").disabled = true;
            });
        }
    };

    return (
        <div className="earnings">
            <div className="select">
                <div className="day">
                    <select className="option" onChange={optionOnChangehadler} >
                        <option value="01">Daily</option>
                        <option value="02">Monthly</option>
                        <option value="03">Yearly</option>
                    </select>
                </div>
                <div className="month">
                    <select className="option" id="month" onChange={monthChangehadler} disabled>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
                <div className="year">
                    <select className="option" id="year" onChange={yearChangehadler} disabled>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                    </select>
                </div>
            </div>
            <div className="values">
                <center>
                    <table>
                        <thead>
                            <tr>
                                <td>Date</td>
                                <td>Revenue</td>
                            </tr>
                        </thead>
                        <tbody>   {earning.map((e) => {
                                return (
                                  <tr>
                                    <td>{e.date}</td> <td>{e.amount}</td>
                                  </tr>);
                            })}
                         
                        </tbody>
                    </table>
                </center>
            </div>
        </div>
    )
}
