# store-manager
[![Build Status](https://travis-ci.org/iAfolayan/store-manager.svg?branch=develop)](https://travis-ci.org/iAfolayan/store-manager)
[![Maintainability](https://api.codeclimate.com/v1/badges/142b219a88134673ca9e/maintainability)](https://codeclimate.com/github/iAfolayan/store-manager/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/iAfolayan/store-manager/badge.svg?branch=develop)](https://coveralls.io/github/iAfolayan/store-manager?branch=develop)


# Description
A web application that helps in managing store and product inventory records.

# Table of Contents
<ul>
            <li>
                <a href="#Technologies">Technologies</a>
            </li>
            <li>
                <a href="#Features">Features</a>
            </li>
          <li>
                <a href="#Installations">Installation</a>
            </li>
        </ul>
        
# Technologies
Currently,
<ul>
<li>HyperText Mark-up Language (HTML) </li>
<li>Cascade Style Sheet (CSS)</li>
<li>Vanilla Javascript</li>
<li>PostgreSQL Database(raw SQL): This will be implemented later.</li>
<li>Nodejs (Express framework)</li>
  </ul>
  
# Pivotal Tracker
Store manager app project is broken down into small task with pivotal tracker board. The link to the relevant Pivoltal tracker board is (https://www.pivotaltracker.com/n/projects/2203755)

# API Enpoint
API Endpoints is hosted at (https://store-manager-iafolayan.herokuapp.com/api/v1/)

# UI Templates
The application is hosted online on gh-pages with (https://iafolayan.github.io/store-manager/ui/)

# API Documentation
to be added later

# Features
Currently,
<ul>
<li>Login</li>
<li>Create User (Sale attendant / Admin)</li>
<li>Create Product</li>
  </ul>

# Getting Started
# Installation
### DevDependiences
npm install
install POSTMAN app
run npm run start-dev then navigate to localhost:4000 on POSTMAN
# API Endpoint Route
<table>
  <tr>
    <td>HTTP VERB</td>
    <td>ENDPOINT</td>
    <td>TASK</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>api/v1/products/</td>
    <td>Create A Product</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>api/v1/products</td>
    <td>Get all products</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>api/v1/products/:productId</td>
    <td>Get a single product</td>
  </tr>
   <tr>
    <td>PATCH</td>
    <td>api/v1/products/productId</td>
    <td>Update product status as success</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>api/v1/sales/</td>
    <td>Get all sale records</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>api/v1/sales/</td>
    <td>Create a sale record</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>api/v1/sales/saleId</td>
    <td>Get selected sale</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>api/v1/sales/seller/:sid</td>
    <td>Get all sales records for a single sale attendant</td>
  </tr>
  </table>
  
# Author
Afolayan Isaiah