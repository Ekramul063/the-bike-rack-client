import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../asets/logo.png'

const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-200 text-base-content">
        <div>
        <Link to={`/`}><img className='h-[100px] w-[120px]' src={logo} alt="logo" /></Link>
        <p>The Bike Rack<br/>Providing reliable tech since 2018</p>
        </div> 
        <div>
          <span className="footer-title">Services</span> 
          <a className="link link-hover">Branding</a> 
          <a className="link link-hover">Design</a> 
          <a className="link link-hover">Marketing</a> 
          <a className="link link-hover">Advertisement</a>
        </div> 
        <div>
          <span className="footer-title">Company</span> 
          <a className="link link-hover">About us</a> 
          <a className="link link-hover">Contact</a> 
          <a className="link link-hover">Jobs</a> 
          <a className="link link-hover">Press kit</a>
        </div> 
        <div>
          <span className="footer-title">Legal</span> 
          <a className="link link-hover">Terms of use</a> 
          <a className="link link-hover">Privacy policy</a> 
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
    );
};

export default Footer;