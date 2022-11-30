import React from 'react';
import Navbar from '../../SharedComponents/Navbar/Navbar';
import './Blogs.css';

const Blogs = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className=' grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 '>
                <div className='blogs-container'>
                    <h2 className='text-3xl font-semibold text-blue-600  mb-3'>What are the different ways to manage a state in a React application?</h2>
                    <p className='text-red-400 font-semibold'>The Four Kinds of React State to Manage
                        When we talk about state in our applications, it’s important to be clear about what types of state actually matter.

                        There are four main types of state you need to properly manage in your React apps:

                        1. Local state,
                        2. Global state,
                        3. Server state,
                       4. URL state</p>
                </div>
                <div className='blogs-container'>
                    <h2 className='text-3xl font-semibold text-blue-600  mb-3'> How does prototypical inheritance work?</h2>
                    <p className='text-red-400 font-semibold'>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.<br />
                    </p>
                </div>

                <div className='blogs-container'>
                    <h2 className='text-3xl font-semibold text-blue-600  mb-3'>What is a unit test? Why should we write unit tests?</h2>
                    <p className='text-red-400 font-semibold'>
                    The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.                    </p>
                </div>
                <div className='blogs-container'>
                    <h2 className='text-3xl font-semibold text-blue-600  mb-3'> React vs. Angular vs. Vue?</h2>
                    <p className='text-red-400 font-semibold'>Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.</p>
                    <p className='text-red-400 font-semibold'></p>
                </div>
            </div>
        </div>
    );
};

export default Blogs;