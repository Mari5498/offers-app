import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import PhoneInput from 'react-phone-number-input/input'
import Select from 'react-select'
import { Redirect } from 'react-router-dom'
import axios from 'axios'


import { useHistory } from 'react-router-dom'
import './App.css';

const options = [{ label: "McDonald's", value: "McDonald's" },
{ label: 'KFC', value: 'KFC' },
{ label: 'Burger King', value: 'Burger King' },
{ label: 'Zataar W Zeit', value: 'Zataar W Zeit' },
{ label: 'Grillo', value: 'Grillo' },
{ label: 'Subway', value: 'Subway' }];




function FrontEnd() {
    let selectedRest = [];
    let phoneNum = '';
    const [value, setValue] = useState();
    const [rest, setRest] = useState([]);
    const [error, setErrorMsg] = useState('');

    const history = useHistory();
    let valid = false;

    function handleSubmit(e) {
        e.preventDefault();
        if (value !== undefined && rest !== undefined) {
            rest.forEach((element) => {
                let label = element.label;
                selectedRest.push(label);
            })
            phoneNum = value;
            valid = true;
            const userInfo = {
                selectedRest,
                phoneNum
            };

            axios
                .post('http://localhost:3000/', userInfo)
                .then(() => console.log('User Created'))
                .catch(err => {
                    console.error(err);
                });
            history.push("/success");
        }

        if (rest.length === 0 && value === undefined) {
            setErrorMsg('Please enter the restaurant(s) and your phone number')
            e.preventDefault();
        }

        if (value === undefined) {
            setErrorMsg('Please enter your phone number')
            e.preventDefault();

        }
        if (rest === undefined) {
            setErrorMsg('Please enter the restaurant(s)')
            e.preventDefault();

        }



    }


    return (

        <Container className="SearchRes p-3">
            <p>Select your favourite restaurants and enter your phone number. Whenever there's a promotion going on at these restaurants on Zomato, we will notify you via a text! :)</p>
            <form onSubmit={handleSubmit}>
                <h3>Choose your restaurant</h3>
                <Select name='selectedRest' isMulti isClearable data={rest} options={options} onChange={setRest} placeholder="Choose your favourite restaurant(s)!" theme={theme => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        primary25: 'hotPink',
                        primary: 'black',
                    }
                })}
                />
                <h3>Enter your phone number</h3>
                <PhoneInput
                    placeholder="Enter phone number"
                    value={value}
                    onChange={setValue}
                    country="AE"
                    className="PhoneInput"
                    name='phoneNum'
                />
                <Button type='submit' variant="light">Subscribe</Button>
                {error && <div className="error"> {error} </div>}
            </form>
        </Container >

    )
}
export default FrontEnd;

