import React, {useState} from 'react'
import {AiOutlineCloudUpload} from "react-icons/ai"
import {BsImageFill} from "react-icons/bs"

export default function AdminAddProduct() {

    const [uploaded, setUploaded] = useState(false);
    const [choosenImage, setChoosenImage] = useState(false);
    const [statusState, setStatusState] = useState(false);
    const [statusMessage, setStatusMessage] = useState(false);


    const imageHandler = (e) => {
        if (e.target.files.length > 0) {
            setChoosenImage(true)
        }
        else {
            setChoosenImage(false)
        }
    }

    const addProductFormHandler = (e) => {
        setStatusState(false)
        e.preventDefault()

        if (!e.target.image.files.length > 0) {
            const tempObject = {
                title: e.target.title.value,
                price: e.target.price.value,
                description: e.target.description.value,
                imageName: "",
                image: ""
            }

            console.log(tempObject)

            fetch("http://localhost:3000/employee/addproduct", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(tempObject)
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                setStatusMessage(data.msg)
                setStatusState(true)
            })
            .catch(err => console.log(err))
            return
        }
        else {
            function fileToDataUri(image) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {resolve(event.target.result)}
                    reader.onerror = (err) => {reject(err)}
                    reader.readAsDataURL(image)
                });
            }
    
            fileToDataUri(e.target.image.files[0])
                .then((base64) => {
                    const tempObject = {
                        title: e.target.title.value,
                        price: e.target.price.value,
                        description: e.target.description.value,
                        imageName: e.target.image.files[0].name,
                        image: base64
                    }
    
                    console.log(tempObject)
    
                    fetch("http://localhost:3000/employee/addproduct", {
                        method: "POST",
                        headers: {
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify(tempObject)
                    })
                    .then(response => response.json())
                    .then((data) => {
                        if (data.status === "Failed") {
                            console.log(data)
                            setStatusMessage(data.msg)
                            setStatusState(true)
                        }
                        else {
                            console.log(data)
                            setUploaded(true)
                        }
                    })
                    .catch(err => console.log(err))
                })
        }
    }

    
    if (uploaded) {
        return (
            <div className="admin__addProduct">
                <p>Produkt tilføjet.</p>

                <button onClick={() => {setUploaded(false)}}>Tilføj flere produkter</button>
            </div>
        )
    }


    return (
        <div className='admin__addProduct'>
            <form onSubmit={addProductFormHandler}>
                <label htmlFor="title">Titel: </label>
                <input type="text" name="title" id="title" />

                <label htmlFor="price">Pris: </label>
                <input type="number" name="price" id="price" step="any" />

                <label htmlFor="description">Beskrivelse: </label>
                <textarea type="text" name="description" id="description" rows="5" />

                {/* <label className='labelfile' htmlFor="image">Upload billede</label> */}
                {
                    choosenImage ? <label className='labelfile labelfileUploaded' htmlFor="image"><BsImageFill /></label>
                    : <label className='labelfile' htmlFor="image"><BsImageFill /></label>
                }
                <input onChange={imageHandler} className='inputfile' type="file" name="image" id="image" accept=".jpg, .png, .jpeg" />
            
                <div className="statusWrapper">
                    <p className={statusState ? "status__show" : "status__hide"}>{statusMessage}</p>
                </div>

                <button type="submit">Opret</button>
            </form>
        </div>
    )
}