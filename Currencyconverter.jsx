import React from 'react'
import './Currencyconverter.css';
import { useEffect, useState } from 'react'
import Axios from 'axios';
import curencyimg from './Currencyconverter.jpg'

const Currencyconverter = () => {
    const [rate, setRate] = useState({})
    const [amount, setAmount] = useState(1)
    const [fromcurrncy, setFromcurrncy] = useState('USD')
    const [tocurrncy, setTocurrncy] = useState('INR')
    const [convert, setConvert] = useState('0')


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await Axios.get(`https://api.exchangerate-api.com/v4/latest/${fromcurrncy}`)
                setRate(res.data.rates)
            }
            catch (error) {
                console.error('error', error);
            }
        }
        fetchdata()
    }, [fromcurrncy])

    const amountcahnge = (e) => {
        setAmount(e.target.value)
    }
    const fromonchange = (e) => {
        setFromcurrncy(e.target.value)
    }
    const toOnchange = (e) => {
        setTocurrncy(e.target.value)
    }

    const convertData = () => {
        const result = (amount * rate[tocurrncy]).toFixed(2)
        setConvert(result)
    }
    const swapbtn = () => {
        setTocurrncy(fromcurrncy)
        setFromcurrncy(tocurrncy)
    }

    return (
        <>
            <div className="Main-div">
                <div className="converter-1">
                    <h2>Currency Converter</h2>

                    <div className="input-group">
                        <label htmlFor="amount">Amount:</label>
                        <input type="number" id="amount" placeholder="Enter amount" value={amount} onChange={amountcahnge} />
                    </div>

                    <div className="input-group">
                        <label >From:</label>
                        <select onChange={fromonchange} value={fromcurrncy}>
                            {
                                Object.keys(rate).map((currency) => (
                                    <option key={currency} value={currency}>{currency}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="input-group">
                        <button className='swapbtn' onClick={swapbtn}>↕</button>
                    </div>

                    <div className="input-group">
                        <label >To:</label>
                        <select onChange={toOnchange} value={tocurrncy}>
                            {
                                Object.keys(rate).map((currency) => (
                                    <option key={currency} value={currency}>{currency}</option>
                                ))
                            }

                        </select>
                    </div>

                    <button onClick={convertData} className='converter-btn'>Convert</button>
                    <div className='resultdiv'>
                        <p>{amount} {fromcurrncy} = {convert} {tocurrncy}</p>
                    </div>
                </div>
                <div className='converter-2'>
                    <img src={curencyimg} alt="" srcset="" />
                </div>
            </div>
        </>
    )
}

export default Currencyconverter
