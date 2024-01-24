import React, { useState } from 'react'

function Mpesa() {
    const [formData, setFormData] = useState({
        phone:"",
        amount:""
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
        const key = event.target.name
        const value = event.target.value
        setFormData({...formData, [key]:value})
    }

    const submiForm = (event) => {
        event.preventDefault()
        setLoading(true)

        fetch('http://127.0.0.1:5000/payment', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        })
        .then((response) => {
            setLoading(false)


            if (response.ok){
                window.alert('Payment made')
            } else{
                window.alert('Payment failed')
            }
        })
        .catch((error) => {

            setLoading(false)

            console.log('This is the error: ', error)
        })
    }
  return (
    <div className='mpesaPage'>
        <h1>Mpesa Payment</h1>
        <form className='mpesaForm' onSubmit={submiForm}>
            <input 
                type='number'
                placeholder='Enter number'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
            />

            <input 
                type='number'
                placeholder='Enter amount'
                name='amount'
                value={formData.amount}
                onChange={handleChange}
            />

            <button type='submit'>
                {loading ? 'Processing...' : 'Submit'}
            </button>
        </form>
    </div>
  )
}

export default Mpesa