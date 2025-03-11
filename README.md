# Animal-Classification-App

# Animal Classification App

## Overview

The Animal Classification App is a simple web application that uses Google's Teachable Machine models to classify animals into various categories such as vertebrates and invertebrates. It further classifies the animals into their respective classes and orders. The app utilizes the p5.js library for handling images and the ml5.js library for machine learning.

## Features

- Classifies animals into vertebrates and invertebrates.
- Further classifies animals into their respective classes and orders.
- Provides a description of the classified animal order.
- Uses p5.js for image handling and ml5.js for machine learning.

## How to Run

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/Animal-Classification-App.git
    cd Animal-Classification-App
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

### Running the App

1. Start the HTTP server:

    ```sh
    npx http-server -c-1
    ```

2. Open your web browser and navigate to the address provided by `http-server` (`http://localhost:8080/classification.html`).

### Usage

- Upload an image of an animal using the file input.
- The app will classify the animal and display the results including the animal's class and order.
- A description of the animal order will also be provided.

## File Structure

- `classification.html`: The main HTML file for the app.
- [services.js](http://_vscodecontentref_/1): The main JavaScript file containing the logic for classification and handling results.
- [vertebrate_orders.json](http://_vscodecontentref_/2): JSON file containing data about vertebrate orders.
- [invertebrate_orders.json](http://_vscodecontentref_/3): JSON file containing data about invertebrate orders.
