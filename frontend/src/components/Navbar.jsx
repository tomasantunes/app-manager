import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">APP MANAGER</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <NavLink to="/home" className="nav-link">Início</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink to="/applications" className="nav-link">Aplicações</NavLink>
                </li>
            </ul>
            </div>
        </div>
    </nav>
  )
}
