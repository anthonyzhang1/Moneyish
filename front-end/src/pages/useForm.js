import { useState } from 'react'

const useForm = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        passwordFinal: ''
    })

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    return { handleChange };
}

export default useForm;