import React, { useState, useContext, useEffect } from 'react';
import './PopUp.css';
import { CgProfile } from 'react-icons/cg';
import { BiImageAdd } from 'react-icons/bi';
import { Context } from '../../ContextApi';

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}


const PopUp = props => {

    const { data, dispatch } = useContext(Context)
    const [img, setImg] = useState();
    const [input, setInput] = useState('');

    const imageUpload = (e) => {
        const file = e.target.files[0];
        const fileRes = e.target.result;
        getBase64(file).then(base64 => {
            localStorage['image'] = base64;
            console.debug("file stored", base64);
            console.log(file);
            setImg([localStorage.getItem('image')])
        });
    };

    const closeBtn = () => {
        props.close();
    }

    // const onChange = (e) => {
    //     e.preventDefault();
    //     setEnteredTitle(e.target.value)
    //     console.log(enteredTitle);
    // }

    const onSubmit = e => {
        e.preventDefault();

        //send enteredTitle
        if (input.title.trim().length === 0 || img.length === 0) {
            alert('You must enter a title for your foto!');
            return;
        } else {
            console.log('YOU SUBMITED THIS: ', input.title);
            closeBtn();
        }

        console.log(img)
        if (img) {
            dispatch({
                type: "ADD_POST", payload: {
                    title: input.title,
                    url: [localStorage.getItem('image')],
                   user: input.user ,
                    tags: input.tag
                }
            })

        }

    }

    useEffect(() => {

        if (localStorage.hasOwnProperty("image") && data.length !== 0) {

            localStorage.setItem("data", JSON.stringify(data))
        }

    }, [img])



    return (
        <>
            <div className='popUp-wrap'>
                <div className='popUp'>
                    <button onClick={closeBtn} className='popUp-btn'>Close</button>
                    <div className='popUp-newPost'>
                        <p>New Post</p>
                    </div>
                    <div className='popUp-container'>
                        <div className='flex items-center'>
                            <CgProfile className='w-10 h-10 mr-4' />
                            <span className='text-xl'>Lorem Ipsum</span>
                        </div>
                        <div className='flex justify-center border border-black rounded-md mt-4 w-full h-48 items-center'>
                            <div className='flex'>
                                <BiImageAdd className='w-10 h-10' />
                            </div>
                            <input
                                type="file"
                                id="imageFile"
                                name='imageFile'
                                onChange={imageUpload}
                            />;
                        </div>
                        <form onSubmit={onSubmit}>
                            <input
                                type='Text'
                                name='user'
                                autoComplete="off"
                                onChange={(e)=>setInput(
                                    {...input, user: e.target.value
                                    })}
                                placeholder='User'
                                className={`border border-black rounded-md mt-4 w-full p-4`}>
                            </input>
                            <input
                                type='Text'
                                name='title'
                                autoComplete="off"
                                onChange={(e)=>setInput(
                                    {...input, title: e.target.value
                                    })}
                                placeholder='Title'
                                className={`border border-black rounded-md mt-4 w-full p-4`}>
                            </input>
                            <input
                                type='Text'
                                name='hashtag'
                                autoComplete="off"
                                onChange={(e)=>setInput(
                                    {...input, tag: e.target.value
                                    })}
                                placeholder='#hashtag'
                                className={`border border-black rounded-md mt-4 w-full p-4`}>
                            </input>
                            <button type='submit' className='mt-4 bg-black w-full 
                        rounded-md border border-black p-2 text-white
                         hover:text-black hover:bg-gray-100'>
                                Post</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PopUp;